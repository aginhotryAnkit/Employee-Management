import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { createDepartmentService, getDepartmentsService, updateDepartmentService, deleteDepartmentService } from './department.service';
import { validateDepartment } from './department.validator';

export const createDepartment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateDepartment(req.body);
  if (!valid) { res.status(400).json({ message: 'Validation failed', errors }); return; }
  try {
    res.status(201).json(await createDepartmentService(req.body));
  } catch (err: any) { res.status(err.status || 500).json({ message: err.message }); }
};

export const getDepartments = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.status(200).json({ departments: await getDepartmentsService() });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
};

export const updateDepartment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { valid, errors } = validateDepartment(req.body);
  if (!valid) { res.status(400).json({ message: 'Validation failed', errors }); return; }
  try {
    res.status(200).json(await updateDepartmentService(req.params.id, req.body));
  } catch (err: any) { res.status(err.status || 500).json({ message: err.message }); }
};

export const deleteDepartment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.status(200).json(await deleteDepartmentService(req.params.id));
  } catch (err: any) { res.status(err.status || 500).json({ message: err.message }); }
};
