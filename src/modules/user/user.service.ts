import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import User from '../../database/models/user.model';
import UserInvite from '../../database/models/user_invite.model';
import Role from '../../database/models/role.model';
import Department from '../../database/models/department.model';
import { ICreateUserPayload, ISetPasswordPayload } from './user.interface';

export const createUserService = async (payload: ICreateUserPayload) => {
  const existing = await User.findOne({ where: { email: payload.email } });
  if (existing) throw { status: 409, message: 'Email already exists' };

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    role_id: payload.role_id,
    department_id: payload.department_id,
    manager_id: payload.manager_id ?? null,
    password: null,
    is_active: false,
  });

  const token = crypto.randomBytes(32).toString('hex');
  const expires_at = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours

  await UserInvite.create({ user_id: user.id, token, expires_at });

  return {
    message: 'Employee created. Invite token generated.',
    user: { id: user.id, name: user.name, email: user.email },
    invite_token: token, // in real app send via email
  };
};

export const setPasswordService = async (payload: ISetPasswordPayload) => {
  const invite = await UserInvite.findOne({
    where: { token: payload.token, is_used: false, expires_at: { [Op.gt]: new Date() } },
  });

  if (!invite) throw { status: 400, message: 'Invalid or expired invite token' };

  const hashed = await bcrypt.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

  await User.update({ password: hashed, is_active: true }, { where: { id: invite.user_id } });
  await invite.update({ is_used: true });

  return { message: 'Password set successfully. You can now login.' };
};

export const getUsersService = async (requesterId: string, requesterRole: string) => {
  const where: any = {};

  // manager can only see their team
  if (requesterRole === 'manager') where.manager_id = requesterId;

  const users = await User.findAll({
    where,
    attributes: { exclude: ['password'] },
    include: [
      { model: Role, as: 'role', attributes: ['name'] },
      { model: Department, as: 'department', attributes: ['name'] },
      { model: User, as: 'manager', attributes: ['id', 'name', 'email'] },
    ],
  });

  return users;
};

export const deleteUserService = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) throw { status: 404, message: 'User not found' };
  await user.destroy();
  return { message: 'User deleted successfully' };
};
