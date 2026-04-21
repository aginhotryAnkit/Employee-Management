import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../../database/models/user.model';
import Role from '../../database/models/role.model';
import { ILoginPayload, IAuthResponse } from './auth.interface';

const generateToken = (id: string): string => {
  const options: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'] };
  return jwt.sign({ id }, process.env.JWT_SECRET as string, options);
};

export const loginService = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const user = await User.findOne({
    where: { email: payload.email },
    include: [{ model: Role, as: 'role' }],
  });

  if (!user) throw { status: 401, message: 'Invalid credentials' };
  if (!user.is_active) throw { status: 403, message: 'Account not activated. Please set your password first.' };
  if (!user.password) throw { status: 403, message: 'Account not activated' };

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

  const token = generateToken(user.id);
  return {
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: (user as any).role?.name,
      is_active: user.is_active,
    },
  };
};
