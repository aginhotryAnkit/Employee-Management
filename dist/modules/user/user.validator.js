"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSetPassword = exports.validateCreateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const fmt = (e) => e.details.map(d => d.message.replace(/"/g, ''));
const createUserSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    email: joi_1.default.string().email().required(),
    role_id: joi_1.default.string().uuid().required(),
    department_id: joi_1.default.string().uuid().required(),
    manager_id: joi_1.default.string().uuid().optional(),
});
const setPasswordSchema = joi_1.default.object({
    token: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required(),
});
const validateCreateUser = (data) => {
    const { error } = createUserSchema.validate(data, { abortEarly: false });
    return { valid: !error, errors: error ? fmt(error) : [] };
};
exports.validateCreateUser = validateCreateUser;
const validateSetPassword = (data) => {
    const { error } = setPasswordSchema.validate(data, { abortEarly: false });
    return { valid: !error, errors: error ? fmt(error) : [] };
};
exports.validateSetPassword = validateSetPassword;
//# sourceMappingURL=user.validator.js.map