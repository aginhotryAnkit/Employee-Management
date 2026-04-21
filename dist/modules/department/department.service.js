"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartmentService = exports.updateDepartmentService = exports.getDepartmentsService = exports.createDepartmentService = void 0;
const department_model_1 = __importDefault(require("../../database/models/department.model"));
const createDepartmentService = async (payload) => {
    const existing = await department_model_1.default.findOne({ where: { name: payload.name } });
    if (existing)
        throw { status: 409, message: 'Department already exists' };
    const dept = await department_model_1.default.create({ name: payload.name });
    return { message: 'Department created', department: dept };
};
exports.createDepartmentService = createDepartmentService;
const getDepartmentsService = async () => {
    return department_model_1.default.findAll();
};
exports.getDepartmentsService = getDepartmentsService;
const updateDepartmentService = async (id, payload) => {
    const dept = await department_model_1.default.findByPk(id);
    if (!dept)
        throw { status: 404, message: 'Department not found' };
    await dept.update({ name: payload.name });
    return { message: 'Department updated', department: dept };
};
exports.updateDepartmentService = updateDepartmentService;
const deleteDepartmentService = async (id) => {
    const dept = await department_model_1.default.findByPk(id);
    if (!dept)
        throw { status: 404, message: 'Department not found' };
    await dept.destroy();
    return { message: 'Department deleted' };
};
exports.deleteDepartmentService = deleteDepartmentService;
//# sourceMappingURL=department.service.js.map