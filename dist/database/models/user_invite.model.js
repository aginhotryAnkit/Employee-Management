"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class UserInvite extends sequelize_1.Model {
}
UserInvite.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: sequelize_1.DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'id' } },
    token: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    expires_at: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    is_used: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, { sequelize: database_1.default, modelName: 'UserInvite', tableName: 'user_invites' });
exports.default = UserInvite;
//# sourceMappingURL=user_invite.model.js.map