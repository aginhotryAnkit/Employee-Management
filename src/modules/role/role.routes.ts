import { Router } from 'express';
import { getRoles } from './role.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Get all roles (for dropdown)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles list
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: Roles fetched successfully
 *               response:
 *                 - id: uuid
 *                   name: employee
 *                 - id: uuid
 *                   name: hr
 *                 - id: uuid
 *                   name: manager
 */
router.get('/', protect, getRoles);

export default router;
