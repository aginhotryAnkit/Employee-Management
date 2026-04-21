"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable('users', {
            id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true, allowNull: false },
            name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
            password: { type: sequelize_1.DataTypes.STRING, allowNull: true },
            role_id: { type: sequelize_1.DataTypes.UUID, allowNull: false, references: { model: 'roles', key: 'id' }, onDelete: 'RESTRICT' },
            department_id: { type: sequelize_1.DataTypes.UUID, allowNull: false, references: { model: 'departments', key: 'id' }, onDelete: 'RESTRICT' },
            manager_id: { type: sequelize_1.DataTypes.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            is_active: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
            createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
            updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('users');
    },
};
//# sourceMappingURL=20240101000003-create-users.js.map