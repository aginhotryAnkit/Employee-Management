"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("./department.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.protect, department_controller_1.getDepartments);
router.post('/', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('hr'), department_controller_1.createDepartment);
router.put('/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('hr'), department_controller_1.updateDepartment);
router.delete('/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('hr'), department_controller_1.deleteDepartment);
exports.default = router;
//# sourceMappingURL=department.routes.js.map