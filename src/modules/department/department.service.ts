import Department from '../../database/models/department.model';
import { ICreateDepartmentPayload } from './department.interface';

export const createDepartmentService = async (payload: ICreateDepartmentPayload) => {
  const existing = await Department.findOne({ where: { name: payload.name } });
  if (existing) throw { status: 409, message: 'Department already exists' };
  const dept = await Department.create({ name: payload.name });
  return { message: 'Department created', department: dept };
};

export const getDepartmentsService = async () => {
  return Department.findAll();
};

export const updateDepartmentService = async (id: string, payload: ICreateDepartmentPayload) => {
  const dept = await Department.findByPk(id);
  if (!dept) throw { status: 404, message: 'Department not found' };
  await dept.update({ name: payload.name });
  return { message: 'Department updated', department: dept };
};

export const deleteDepartmentService = async (id: string) => {
  const dept = await Department.findByPk(id);
  if (!dept) throw { status: 404, message: 'Department not found' };
  await dept.destroy();
  return { message: 'Department deleted' };
};
