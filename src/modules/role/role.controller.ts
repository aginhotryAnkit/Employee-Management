import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { getRolesService } from './role.service';
import { sendSuccess, sendError } from '../../utils/response';

export const getRoles = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const roles = await getRolesService();
    sendSuccess({ res, statusCode: 200, message: 'Roles fetched successfully', data: roles });
  } catch (err: any) {
    sendError({ res, statusCode: 500, message: 'Failed to fetch roles' });
  }
};
