"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const employee_model_1 = __importDefault(require("../database/models/employee.model"));
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const employee = await employee_model_1.default.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
        if (!employee) {
            res.status(401).json({ message: 'Employee not found' });
            return;
        }
        req.employee = employee;
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map