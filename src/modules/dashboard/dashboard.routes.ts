import { Router } from 'express';
import { getDashboard } from './dashboard.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, authorize('hr', 'manager'), getDashboard);

export default router;
