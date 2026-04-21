import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { createUserService, setPasswordService, getUsersService, deleteUserService } from './user.service';
import { validateCreateUser, validateSetPassword } from './user.validator';

export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateCreateUser(req.body);
  if (!valid) { res.status(400).json({ message: 'Validation failed', errors }); return; }

  try {
    const result = await createUserService(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to create user' });
  }
};

export const setPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateSetPassword(req.body);
  if (!valid) { res.status(400).json({ message: 'Validation failed', errors }); return; }

  try {
    const result = await setPasswordService(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to set password' });
  }
};

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await getUsersService(req.user!.id, req.user!.role);
    res.status(200).json({ users });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to fetch users' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await deleteUserService(req.params.id);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to delete user' });
  }
};
