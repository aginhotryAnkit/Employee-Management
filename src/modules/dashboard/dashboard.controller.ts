import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { getDashboardService } from './dashboard.service';
import { sendSuccess, sendError } from '../../utils/response';

export const getDashboard = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = await getDashboardService();
    sendSuccess({ res, statusCode: 200, message: 'Dashboard fetched successfully', data });
  } catch (err: any) {
    sendError({ res, statusCode: 500, message: err.message || 'Failed to fetch dashboard data' });
  }
};
