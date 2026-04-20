"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
module.exports = {
    async up(queryInterface) {
        const saltRounds = 10;
        await queryInterface.bulkInsert('employees', [
            {
                id: (0, uuid_1.v4)(),
                name: 'Super Admin',
                email: 'admin@company.com',
                password: await bcryptjs_1.default.hash('Admin@123', saltRounds),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                name: 'John Employee',
                email: 'john@company.com',
                password: await bcryptjs_1.default.hash('John@123', saltRounds),
                role: 'employee',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('employees', {});
    },
};
//# sourceMappingURL=20240101000001-seed-employees.js.map