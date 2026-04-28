import { Router } from 'express';
import { getDashboard } from './dashboard.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get dashboard stats (HR and Manager only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: Dashboard fetched successfully
 *               response:
 *                 summary:
 *                   totalEmployees:
 *                     title: Total Employees
 *                     count: "256"
 *                   activeEmployees:
 *                     title: Active Employees
 *                     count: "226"
 *                   pendingInvites:
 *                     title: Pending Invites
 *                     count: "56"
 *                   departments:
 *                     title: Departments
 *                     count: "14"
 *                 recentEmployees:
 *                   - id: uuid
 *                     name: Rohit Sharma
 *                     email: rohit@company.com
 *                     role: manager
 *                     department: Engineering
 *                     manager: null
 *                     status: Active
 *                     avatar: null
 *                 pendingInvites:
 *                   - email: neha@company.com
 *                     role: employee
 *                     expiresIn: 12 hours
 *                 departmentStats:
 *                   - department: Engineering
 *                     count: 12
 *                   - department: Human Resources
 *                     count: 5
 *       403:
 *         description: Access denied
 */
router.get('/', protect, authorize('hr', 'manager'), getDashboard);

export default router;
