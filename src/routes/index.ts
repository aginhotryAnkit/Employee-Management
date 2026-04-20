import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';

const router = Router();

// Auth routes — /api/auth
router.use('/auth', authRoutes);

export default router;
