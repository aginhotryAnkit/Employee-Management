"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.getUsersService = exports.setPasswordService = exports.createUserService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("../../database/models/user.model"));
const user_invite_model_1 = __importDefault(require("../../database/models/user_invite.model"));
const role_model_1 = __importDefault(require("../../database/models/role.model"));
const department_model_1 = __importDefault(require("../../database/models/department.model"));
const createUserService = async (payload) => {
    const existing = await user_model_1.default.findOne({ where: { email: payload.email } });
    if (existing)
        throw { status: 409, message: 'Email already exists' };
    const user = await user_model_1.default.create({
        name: payload.name,
        email: payload.email,
        role_id: payload.role_id,
        department_id: payload.department_id,
        manager_id: payload.manager_id ?? null,
        password: null,
        is_active: false,
    });
    const token = crypto_1.default.randomBytes(32).toString('hex');
    const expires_at = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
    await user_invite_model_1.default.create({ user_id: user.id, token, expires_at });
    return {
        message: 'Employee created. Invite token generated.',
        user: { id: user.id, name: user.name, email: user.email },
        invite_token: token, // in real app send via email
    };
};
exports.createUserService = createUserService;
const setPasswordService = async (payload) => {
    const invite = await user_invite_model_1.default.findOne({
        where: { token: payload.token, is_used: false, expires_at: { [sequelize_1.Op.gt]: new Date() } },
    });
    if (!invite)
        throw { status: 400, message: 'Invalid or expired invite token' };
    const hashed = await bcryptjs_1.default.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
    await user_model_1.default.update({ password: hashed, is_active: true }, { where: { id: invite.user_id } });
    await invite.update({ is_used: true });
    return { message: 'Password set successfully. You can now login.' };
};
exports.setPasswordService = setPasswordService;
const getUsersService = async (requesterId, requesterRole) => {
    const where = {};
    // manager can only see their team
    if (requesterRole === 'manager')
        where.manager_id = requesterId;
    const users = await user_model_1.default.findAll({
        where,
        attributes: { exclude: ['password'] },
        include: [
            { model: role_model_1.default, as: 'role', attributes: ['name'] },
            { model: department_model_1.default, as: 'department', attributes: ['name'] },
            { model: user_model_1.default, as: 'manager', attributes: ['id', 'name', 'email'] },
        ],
    });
    return users;
};
exports.getUsersService = getUsersService;
const deleteUserService = async (id) => {
    const user = await user_model_1.default.findByPk(id);
    if (!user)
        throw { status: 404, message: 'User not found' };
    await user.destroy();
    return { message: 'User deleted successfully' };
};
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=user.service.js.map