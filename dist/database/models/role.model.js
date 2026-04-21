"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Role extends sequelize_1.Model {
}
Role.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    name: { type: sequelize_1.DataTypes.ENUM('hr', 'manager', 'employee'), allowNull: false, unique: true },
}, { sequelize: database_1.default, modelName: 'Role', tableName: 'roles' });
exports.default = Role;
//# sourceMappingURL=role.model.js.map