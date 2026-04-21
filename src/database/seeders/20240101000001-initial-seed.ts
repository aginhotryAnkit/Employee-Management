import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const hrRoleId = uuidv4();
const managerRoleId = uuidv4();
const employeeRoleId = uuidv4();
const defaultDeptId = uuidv4();
const hrUserId = uuidv4();

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Roles
    await queryInterface.bulkInsert('roles', [
      { id: hrRoleId, name: 'hr', createdAt: new Date(), updatedAt: new Date() },
      { id: managerRoleId, name: 'manager', createdAt: new Date(), updatedAt: new Date() },
      { id: employeeRoleId, name: 'employee', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Default department
    await queryInterface.bulkInsert('departments', [
      { id: defaultDeptId, name: 'Human Resources', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Initial HR user
    await queryInterface.bulkInsert('users', [
      {
        id: hrUserId,
        name: 'Super HR',
        email: 'hr@company.com',
        password: await bcrypt.hash('Hr@12345', 10),
        role_id: hrRoleId,
        department_id: defaultDeptId,
        manager_id: null,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('users', {});
    await queryInterface.bulkDelete('departments', {});
    await queryInterface.bulkDelete('roles', {});
  },
};
