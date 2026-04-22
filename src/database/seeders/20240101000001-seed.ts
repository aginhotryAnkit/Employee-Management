import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Roles
const hrRoleId = uuidv4();
const managerRoleId = uuidv4();
const employeeRoleId = uuidv4();

// Departments
const deptHR          = uuidv4();
const deptEngineering = uuidv4();
const deptMarketing   = uuidv4();
const deptSales       = uuidv4();
const deptFinance     = uuidv4();
const deptDesign      = uuidv4();

// Users
const hrUserId   = uuidv4();
const manager1Id = uuidv4();
const manager2Id = uuidv4();
const manager3Id = uuidv4();
const emp1Id     = uuidv4();
const emp2Id     = uuidv4();
const emp3Id     = uuidv4();
const emp4Id     = uuidv4();
const emp5Id     = uuidv4();
const emp6Id     = uuidv4();
const emp7Id     = uuidv4();
const emp8Id     = uuidv4();
const emp9Id     = uuidv4();
const emp10Id    = uuidv4();

const now         = new Date();
const futureDate  = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
const pastDate    = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
const sampleHash  = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Roles
    await queryInterface.bulkInsert('roles', [
      { id: hrRoleId,       name: 'hr',       createdAt: now, updatedAt: now },
      { id: managerRoleId,  name: 'manager',  createdAt: now, updatedAt: now },
      { id: employeeRoleId, name: 'employee', createdAt: now, updatedAt: now },
    ]);

    // Departments
    await queryInterface.bulkInsert('departments', [
      { id: deptHR,          name: 'Human Resources', createdAt: now, updatedAt: now },
      { id: deptEngineering, name: 'Engineering',      createdAt: now, updatedAt: now },
      { id: deptMarketing,   name: 'Marketing',        createdAt: now, updatedAt: now },
      { id: deptSales,       name: 'Sales',            createdAt: now, updatedAt: now },
      { id: deptFinance,     name: 'Finance',          createdAt: now, updatedAt: now },
      { id: deptDesign,      name: 'Design',           createdAt: now, updatedAt: now },
    ]);

    // Users
    await queryInterface.bulkInsert('users', [
      // HR Admin
      {
        id: hrUserId, name: 'Super HR', email: 'hr@company.com',
        password: await bcrypt.hash('Hr@12345', 10),
        role_id: hrRoleId, department_id: deptHR, manager_id: null,
        is_active: true, createdAt: now, updatedAt: now,
      },
      // Managers
      {
        id: manager1Id, name: 'Alice Johnson', email: 'alice.johnson@company.com',
        password: sampleHash, role_id: managerRoleId, department_id: deptEngineering,
        manager_id: null, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: manager2Id, name: 'Bob Williams', email: 'bob.williams@company.com',
        password: sampleHash, role_id: managerRoleId, department_id: deptMarketing,
        manager_id: null, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: manager3Id, name: 'Carol Davis', email: 'carol.davis@company.com',
        password: sampleHash, role_id: managerRoleId, department_id: deptSales,
        manager_id: null, is_active: true, createdAt: now, updatedAt: now,
      },
      // Employees
      {
        id: emp1Id, name: 'David Brown', email: 'david.brown@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptEngineering,
        manager_id: manager1Id, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: emp2Id, name: 'Eva Martinez', email: 'eva.martinez@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptEngineering,
        manager_id: manager1Id, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: emp3Id, name: 'Frank Wilson', email: 'frank.wilson@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptEngineering,
        manager_id: manager1Id, is_active: false, createdAt: now, updatedAt: now,
      },
      {
        id: emp4Id, name: 'Grace Lee', email: 'grace.lee@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptMarketing,
        manager_id: manager2Id, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: emp5Id, name: 'Henry Taylor', email: 'henry.taylor@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptMarketing,
        manager_id: manager2Id, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: emp6Id, name: 'Isla Anderson', email: 'isla.anderson@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptSales,
        manager_id: manager3Id, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: emp7Id, name: 'Jack Thomas', email: 'jack.thomas@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptSales,
        manager_id: manager3Id, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: emp8Id, name: 'Karen White', email: 'karen.white@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptFinance,
        manager_id: null, is_active: true, createdAt: now, updatedAt: now,
      },
      {
        id: emp9Id, name: 'Liam Harris', email: 'liam.harris@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptDesign,
        manager_id: null, is_active: false, createdAt: now, updatedAt: now,
      },
      {
        id: emp10Id, name: 'Mia Clark', email: 'mia.clark@company.com',
        password: sampleHash, role_id: employeeRoleId, department_id: deptDesign,
        manager_id: null, is_active: true, createdAt: now, updatedAt: now,
      },
    ]);

    // User Invites
    await queryInterface.bulkInsert('user_invites', [
      // Active — unused, not expired
      { id: uuidv4(), user_id: emp1Id, token: uuidv4(), expires_at: futureDate, is_used: false, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: emp2Id, token: uuidv4(), expires_at: futureDate, is_used: false, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: emp3Id, token: uuidv4(), expires_at: futureDate, is_used: false, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: emp4Id, token: uuidv4(), expires_at: futureDate, is_used: false, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: emp5Id, token: uuidv4(), expires_at: futureDate, is_used: false, createdAt: now, updatedAt: now },
      // Used
      { id: uuidv4(), user_id: emp6Id,    token: uuidv4(), expires_at: pastDate, is_used: true, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: emp7Id,    token: uuidv4(), expires_at: pastDate, is_used: true, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: emp8Id,    token: uuidv4(), expires_at: pastDate, is_used: true, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: manager1Id, token: uuidv4(), expires_at: pastDate, is_used: true, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: manager2Id, token: uuidv4(), expires_at: pastDate, is_used: true, createdAt: now, updatedAt: now },
      // Expired but unused
      { id: uuidv4(), user_id: emp9Id,  token: uuidv4(), expires_at: pastDate, is_used: false, createdAt: now, updatedAt: now },
      { id: uuidv4(), user_id: emp10Id, token: uuidv4(), expires_at: pastDate, is_used: false, createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('user_invites', {});
    await queryInterface.bulkDelete('users', {});
    await queryInterface.bulkDelete('departments', {});
    await queryInterface.bulkDelete('roles', {});
  },
};
