import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { createDepartmentService, getDepartmentsService, updateDepartmentService, deleteDepartmentService } from './department.service';
import { validateCreateDepartment, validateUpdateDepartment } from './department.validator';
import { sendSuccess, sendError } from '../../utils/response';

export const createDepartment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateCreateDepartment(req.body);
  if (!valid) { sendError({ res, statusCode: 400, message: 'Validation failed', errors }); return; }
  try {
    const dept = await createDepartmentService(req.body, req.user!.id);
    sendSuccess({ res, statusCode: 201, message: 'Department created', data: dept });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message });
  }
};

export const getDepartments = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const departments = await getDepartmentsService();
    sendSuccess({ res, statusCode: 200, message: 'Departments fetched successfully', data: departments });
  } catch (err: any) {
    sendError({ res, statusCode: 500, message: err.message });
  }
};

export const updateDepartment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateUpdateDepartment(req.body);
  if (!valid) { sendError({ res, statusCode: 400, message: 'Validation failed', errors }); return; }
  try {
    const dept = await updateDepartmentService(req.params.id, req.body, req.user!.id);
    sendSuccess({ res, statusCode: 200, message: 'Department updated', data: dept });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message });
  }
};

export const deleteDepartment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await deleteDepartmentService(req.params.id);
    sendSuccess({ res, statusCode: 200, message: result.message });
  } catch (err: any) {
    sendError({ res, statusCode: err.status || 500, message: err.message });
  }
};
