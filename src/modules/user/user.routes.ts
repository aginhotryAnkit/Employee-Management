import { Router } from 'express';
import { createUser, setPassword, getUsers, deleteUser, getManagers } from './user.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/set-password', setPassword);
router.get('/managers', protect, authorize('hr'), getManagers);         // dropdown + search for managers
router.get('/', protect, authorize('hr', 'manager'), getUsers);
router.post('/', protect, authorize('hr'), createUser);
router.delete('/:id', protect, authorize('hr'), deleteUser);

export default router;
