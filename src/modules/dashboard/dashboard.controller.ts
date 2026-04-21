import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { getDashboardService } from './dashboard.service';

export const getDashboard = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = await getDashboardService();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to fetch dashboard data' });
  }
};
