import { Op } from 'sequelize';
import Department from '../../database/models/department.model';
import User from '../../database/models/user.model';
import Role from '../../database/models/role.model';
import { ICreateDepartmentPayload, IUpdateDepartmentPayload } from './department.interface';

const headInclude = {
  model: User,
  as: 'head',
  attributes: ['id', 'name', 'email'],
};

export const createDepartmentService = async (payload: ICreateDepartmentPayload, createdBy: string) => {
  const existing = await Department.findOne({
    where: { [Op.or]: [{ name: payload.name }, { code: payload.code.toUpperCase() }] },
  });
  if (existing) throw { status: 409, message: existing.name === payload.name ? 'Department name already exists' : 'Department code already exists' };

  const dept = await Department.create({
    ...payload,
    code: payload.code.toUpperCase(),
    created_by: createdBy,
    updated_by: createdBy,
  });

  return Department.findByPk(dept.id, { include: [headInclude] });
};

export const getDepartmentsService = async () => {
  return Department.findAll({
    include: [headInclude],
    order: [['name', 'ASC']],
  });
};

export const updateDepartmentService = async (id: string, payload: IUpdateDepartmentPayload, updatedBy: string) => {
  const dept = await Department.findByPk(id);
  if (!dept) throw { status: 404, message: 'Department not found' };

  if (payload.code) payload.code = payload.code.toUpperCase();

  await dept.update({ ...payload, updated_by: updatedBy });
  return Department.findByPk(id, { include: [headInclude] });
};

export const getDepartmentByIdService = async (id: string) => {
  const dept = await Department.findByPk(id, {
    include: [{ model: User, as: 'head', attributes: ['id', 'name', 'email'] }],
  });
  if (!dept) throw { status: 404, message: 'Department not found' };

  const [totalEmployees, activeEmployees, employees] = await Promise.all([
    User.count({ where: { department_id: id } }),
    User.count({ where: { department_id: id, is_active: true } }),
    User.findAll({
      where: { department_id: id },
      attributes: ['id', 'name', 'email', 'is_active'],
      include: [
        { model: Role, as: 'role', attributes: ['name'] },
        { model: User, as: 'manager', attributes: ['id', 'name', 'email'] },
      ],
      order: [['name', 'ASC']],
    }),
  ]);

  return {
    ...dept.toJSON(),
    stats: {
      totalEmployees,
      activeEmployees,
      inactiveEmployees: totalEmployees - activeEmployees,
    },
    employees,
  };
};

export const deleteDepartmentService = async (id: string) => {
  const dept = await Department.findByPk(id);
  if (!dept) throw { status: 404, message: 'Department not found' };
  await dept.destroy();
  return { message: 'Department deleted' };
};
