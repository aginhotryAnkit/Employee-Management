"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable('roles', {
            id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true, allowNull: false },
            name: { type: sequelize_1.DataTypes.ENUM('hr', 'manager', 'employee'), allowNull: false, unique: true },
            createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
            updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('roles');
    },
};
//# sourceMappingURL=20240101000001-create-roles.js.map