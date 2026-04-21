import { Router } from 'express';
import { createDepartment, getDepartments, updateDepartment, deleteDepartment } from './department.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getDepartments);
router.post('/', protect, authorize('hr'), createDepartment);
router.put('/:id', protect, authorize('hr'), updateDepartment);
router.delete('/:id', protect, authorize('hr'), deleteDepartment);

export default router;
