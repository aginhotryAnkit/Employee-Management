import { Router } from 'express';
import { createUser, setPassword, getUsers, deleteUser, getManagers } from './user.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/users/set-password:
 *   post:
 *     tags: [Users]
 *     summary: Set password using invite token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token:
 *                 type: string
 *                 example: abc123def456
 *               password:
 *                 type: string
 *                 example: MyPassword@123
 *     responses:
 *       200:
 *         description: Password set successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post('/set-password', setPassword);

/**
 * @swagger
 * /api/users/managers:
 *   get:
 *     tags: [Users]
 *     summary: Get all managers (for dropdown with search)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter managers by name or email
 *         example: rohit
 *     responses:
 *       200:
 *         description: Managers list
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: Managers fetched successfully
 *               response:
 *                 - id: uuid
 *                   name: Rohit Sharma
 *                   email: rohit@company.com
 *                   department:
 *                     name: Engineering
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (HR only)
 */
router.get('/managers', protect, authorize('hr'), getManagers);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: Users fetched successfully
 *               response:
 *                 - id: uuid
 *                   name: Neha Singh
 *                   email: neha@company.com
 *                   is_active: true
 *                   role:
 *                     name: employee
 *                   department:
 *                     name: Engineering
 *                   manager:
 *                     id: uuid
 *                     name: Aman Gupta
 *                     email: aman@company.com
 *   post:
 *     tags: [Users]
 *     summary: Create new employee (HR only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, role_id, department_id]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Neha Singh
 *               email:
 *                 type: string
 *                 format: email
 *                 example: neha@company.com
 *               role_id:
 *                 type: string
 *                 format: uuid
 *               department_id:
 *                 type: string
 *                 format: uuid
 *               manager_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Employee created
 *       409:
 *         description: Email already exists
 */
router.get('/', protect, authorize('hr', 'manager'), getUsers);
router.post('/', protect, authorize('hr'), createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user by ID (HR only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/:id', protect, authorize('hr'), deleteUser);

export default router;
