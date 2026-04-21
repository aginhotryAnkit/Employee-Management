"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDepartment = void 0;
const joi_1 = __importDefault(require("joi"));
const fmt = (e) => e.details.map(d => d.message.replace(/"/g, ''));
const schema = joi_1.default.object({ name: joi_1.default.string().trim().required() });
const validateDepartment = (data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    return { valid: !error, errors: error ? fmt(error) : [] };
};
exports.validateDepartment = validateDepartment;
//# sourceMappingURL=department.validator.js.map