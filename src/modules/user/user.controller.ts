import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { createUserService, setPasswordService, getUsersService, deleteUserService } from './user.service';
import { validateCreateUser, validateSetPassword } from './user.validator';
import { sendSuccess, sendError } from '../../utils/response';

export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateCreateUser(req.body);
  if (!valid) { sendError({ res, statusCode: 400, message: 'Validation failed', errors }); return; }

  try {
    const result = await createUserService(req.body);
    sendSuccess({ res, statusCode: 201, message: result.message, data: result });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message || 'Failed to create user' });
  }
};

export const setPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateSetPassword(req.body);
  if (!valid) { sendError({ res, statusCode: 400, message: 'Validation failed', errors }); return; }

  try {
    const result = await setPasswordService(req.body);
    sendSuccess({ res, statusCode: 200, message: result.message });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message || 'Failed to set password' });
  }
};

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await getUsersService(req.user!.id, req.user!.role);
    sendSuccess({ res, statusCode: 200, message: 'Users fetched successfully', data: users });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message || 'Failed to fetch users' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await deleteUserService(req.params.id);
    sendSuccess({ res, statusCode: 200, message: result.message });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message || 'Failed to delete user' });
  }
};
