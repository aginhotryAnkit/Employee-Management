"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable('user_invites', {
            id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true, allowNull: false },
            user_id: { type: sequelize_1.DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
            token: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
            expires_at: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            is_used: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
            createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
            updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('user_invites');
    },
};
//# sourceMappingURL=20240101000004-create-user-invites.js.map