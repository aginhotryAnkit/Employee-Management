import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import Employee from '../../database/models/employee.model';
import { ISignupPayload, ILoginPayload, IAuthResponse } from './auth.interface';

const generateToken = (id: string): string => {
  const options: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'] };
  return jwt.sign({ id }, process.env.JWT_SECRET as string, options);
};

export const signupService = async (payload: ISignupPayload): Promise<IAuthResponse> => {
  const existing = await Employee.findOne({ where: { email: payload.email } });
  if (existing) throw { status: 409, message: 'Email already registered' };

  const hashed = await bcrypt.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUNDS));
  const employee = await Employee.create({ ...payload, password: hashed });

  const token = generateToken(employee.id);
  return {
    message: 'Employee registered successfully',
    token,
    employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role },
  };
};

export const loginService = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const employee = await Employee.findOne({ where: { email: payload.email } });
  if (!employee) throw { status: 401, message: 'Invalid credentials' };

  const isMatch = await bcrypt.compare(payload.password, employee.password);
  if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

  const token = generateToken(employee.id);
  return {
    message: 'Login successful',
    token,
    employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role },
  };
};
