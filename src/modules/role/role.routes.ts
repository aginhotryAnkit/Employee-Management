import { Router } from 'express';
import { getRoles } from './role.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getRoles);

export default router;
