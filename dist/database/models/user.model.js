"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const role_model_1 = __importDefault(require("./role.model"));
const department_model_1 = __importDefault(require("./department.model"));
class User extends sequelize_1.Model {
}
User.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: true, defaultValue: null },
    role_id: { type: sequelize_1.DataTypes.UUID, allowNull: false, references: { model: 'roles', key: 'id' } },
    department_id: { type: sequelize_1.DataTypes.UUID, allowNull: false, references: { model: 'departments', key: 'id' } },
    manager_id: { type: sequelize_1.DataTypes.UUID, allowNull: true, references: { model: 'users', key: 'id' } },
    is_active: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, { sequelize: database_1.default, modelName: 'User', tableName: 'users' });
// Associations
User.belongsTo(role_model_1.default, { foreignKey: 'role_id', as: 'role' });
User.belongsTo(department_model_1.default, { foreignKey: 'department_id', as: 'department' });
User.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' });
exports.default = User;
//# sourceMappingURL=user.model.js.map