"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../database/models/user.model"));
const role_model_1 = __importDefault(require("../../database/models/role.model"));
const generateToken = (id) => {
    const options = { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') };
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, options);
};
const loginService = async (payload) => {
    const user = await user_model_1.default.findOne({
        where: { email: payload.email },
        include: [{ model: role_model_1.default, as: 'role' }],
    });
    if (!user)
        throw { status: 401, message: 'Invalid credentials' };
    if (!user.is_active)
        throw { status: 403, message: 'Account not activated. Please set your password first.' };
    if (!user.password)
        throw { status: 403, message: 'Account not activated' };
    const isMatch = await bcryptjs_1.default.compare(payload.password, user.password);
    if (!isMatch)
        throw { status: 401, message: 'Invalid credentials' };
    const token = generateToken(user.id);
    return {
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role?.name,
            is_active: user.is_active,
        },
    };
};
exports.loginService = loginService;
//# sourceMappingURL=auth.service.js.map