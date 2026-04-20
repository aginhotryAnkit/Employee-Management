"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.signupService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const employee_model_1 = __importDefault(require("../../database/models/employee.model"));
const generateToken = (id) => {
    const options = { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') };
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, options);
};
const signupService = async (payload) => {
    const existing = await employee_model_1.default.findOne({ where: { email: payload.email } });
    if (existing)
        throw { status: 409, message: 'Email already registered' };
    const hashed = await bcryptjs_1.default.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUNDS));
    const employee = await employee_model_1.default.create({ ...payload, password: hashed });
    const token = generateToken(employee.id);
    return {
        message: 'Employee registered successfully',
        token,
        employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role },
    };
};
exports.signupService = signupService;
const loginService = async (payload) => {
    const employee = await employee_model_1.default.findOne({ where: { email: payload.email } });
    if (!employee)
        throw { status: 401, message: 'Invalid credentials' };
    const isMatch = await bcryptjs_1.default.compare(payload.password, employee.password);
    if (!isMatch)
        throw { status: 401, message: 'Invalid credentials' };
    const token = generateToken(employee.id);
    return {
        message: 'Login successful',
        token,
        employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role },
    };
};
exports.loginService = loginService;
//# sourceMappingURL=auth.service.js.map