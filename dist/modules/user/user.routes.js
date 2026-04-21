"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/set-password', user_controller_1.setPassword); // public — employee sets password via invite token
router.get('/', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('hr', 'manager'), user_controller_1.getUsers); // hr sees all, manager sees team
router.post('/', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('hr'), user_controller_1.createUser); // only hr can create
router.delete('/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('hr'), user_controller_1.deleteUser); // only hr can delete
exports.default = router;
//# sourceMappingURL=user.routes.js.map