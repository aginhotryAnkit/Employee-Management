import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { createDepartmentService, getDepartmentsService, updateDepartmentService, deleteDepartmentService } from './department.service';
import { validateDepartment } from './department.validator';
import { sendSuccess, sendError } from '../../utils/response';

export const createDepartment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateDepartment(req.body);
  if (!valid) { sendError({ res, statusCode: 400, message: 'Validation failed', errors }); return; }
  try {
    const result = await createDepartmentService(req.body);
    sendSuccess({ res, statusCode: 201, message: result.message, data: result.department });
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
  const { valid, errors } = validateDepartment(req.body);
  if (!valid) { sendError({ res, statusCode: 400, message: 'Validation failed', errors }); return; }
  try {
    const result = await updateDepartmentService(req.params.id, req.body);
    sendSuccess({ res, statusCode: 200, message: result.message, data: result.department });
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
