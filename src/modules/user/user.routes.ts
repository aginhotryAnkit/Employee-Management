import { Router } from 'express';
import { createUser, setPassword, getUsers, deleteUser } from './user.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/set-password', setPassword);                              // public — employee sets password via invite token
router.get('/', protect, authorize('hr', 'manager'), getUsers);        // hr sees all, manager sees team
router.post('/', protect, authorize('hr'), createUser);                 // only hr can create
router.delete('/:id', protect, authorize('hr'), deleteUser);            // only hr can delete

export default router;
