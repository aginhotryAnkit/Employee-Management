import { Router } from 'express';
import { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } from './department.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/departments:
 *   get:
 *     tags: [Departments]
 *     summary: Get all departments (for dropdown)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Departments list
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: Departments fetched successfully
 *               response:
 *                 - id: uuid
 *                   name: Engineering
 *                 - id: uuid
 *                   name: Human Resources
 *   post:
 *     tags: [Departments]
 *     summary: Create a department (HR only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Engineering
 *     responses:
 *       201:
 *         description: Department created
 *       409:
 *         description: Department already exists
 */
router.get('/', protect, getDepartments);
router.post('/', protect, authorize('hr'), createDepartment);
router.get('/:id', protect, getDepartmentById);

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     tags: [Departments]
 *     summary: Update a department (HR only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Product Engineering
 *     responses:
 *       200:
 *         description: Department updated
 *       404:
 *         description: Department not found
 *   delete:
 *     tags: [Departments]
 *     summary: Delete a department (HR only)
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
 *         description: Department deleted
 *       404:
 *         description: Department not found
 */
router.put('/:id', protect, authorize('hr'), updateDepartment);
router.delete('/:id', protect, authorize('hr'), deleteDepartment);

export default router;
