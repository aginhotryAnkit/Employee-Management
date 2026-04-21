"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const fmt = (e) => e.details.map(d => d.message.replace(/"/g, ''));
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const validateLogin = (data) => {
    const { error } = loginSchema.validate(data, { abortEarly: false });
    return { valid: !error, errors: error ? fmt(error) : [] };
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=auth.validator.js.map