import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/user/user.routes';
import departmentRoutes from '../modules/department/department.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';
import roleRoutes from '../modules/role/role.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/roles', roleRoutes);

export default router;
