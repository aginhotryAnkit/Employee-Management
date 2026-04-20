"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    role: joi_1.default.string().valid('admin', 'employee').default('employee'),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const formatErrors = (error) => error.details.map((d) => d.message.replace(/"/g, ''));
const validateSignup = (data) => {
    const { error } = signupSchema.validate(data, { abortEarly: false });
    return { valid: !error, errors: error ? formatErrors(error) : [] };
};
exports.validateSignup = validateSignup;
const validateLogin = (data) => {
    const { error } = loginSchema.validate(data, { abortEarly: false });
    return { valid: !error, errors: error ? formatErrors(error) : [] };
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=auth.validator.js.map