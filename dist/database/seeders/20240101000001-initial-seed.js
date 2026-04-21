"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const hrRoleId = (0, uuid_1.v4)();
const managerRoleId = (0, uuid_1.v4)();
const employeeRoleId = (0, uuid_1.v4)();
const defaultDeptId = (0, uuid_1.v4)();
const hrUserId = (0, uuid_1.v4)();
module.exports = {
    async up(queryInterface) {
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
                password: await bcryptjs_1.default.hash('Hr@12345', 10),
                role_id: hrRoleId,
                department_id: defaultDeptId,
                manager_id: null,
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('users', {});
        await queryInterface.bulkDelete('departments', {});
        await queryInterface.bulkDelete('roles', {});
    },
};
//# sourceMappingURL=20240101000001-initial-seed.js.map