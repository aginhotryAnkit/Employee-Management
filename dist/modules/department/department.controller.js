"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartments = exports.createDepartment = void 0;
const department_service_1 = require("./department.service");
const department_validator_1 = require("./department.validator");
const createDepartment = async (req, res) => {
    const { valid, errors } = (0, department_validator_1.validateDepartment)(req.body);
    if (!valid) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }
    try {
        res.status(201).json(await (0, department_service_1.createDepartmentService)(req.body));
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
exports.createDepartment = createDepartment;
const getDepartments = async (_req, res) => {
    try {
        res.status(200).json({ departments: await (0, department_service_1.getDepartmentsService)() });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getDepartments = getDepartments;
const updateDepartment = async (req, res) => {
    const { valid, errors } = (0, department_validator_1.validateDepartment)(req.body);
    if (!valid) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }
    try {
        res.status(200).json(await (0, department_service_1.updateDepartmentService)(req.params.id, req.body));
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (req, res) => {
    try {
        res.status(200).json(await (0, department_service_1.deleteDepartmentService)(req.params.id));
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
exports.deleteDepartment = deleteDepartment;
//# sourceMappingURL=department.controller.js.map