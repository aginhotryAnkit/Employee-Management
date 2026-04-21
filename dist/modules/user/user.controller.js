"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUsers = exports.setPassword = exports.createUser = void 0;
const user_service_1 = require("./user.service");
const user_validator_1 = require("./user.validator");
const createUser = async (req, res) => {
    const { valid, errors } = (0, user_validator_1.validateCreateUser)(req.body);
    if (!valid) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }
    try {
        const result = await (0, user_service_1.createUserService)(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Failed to create user' });
    }
};
exports.createUser = createUser;
const setPassword = async (req, res) => {
    const { valid, errors } = (0, user_validator_1.validateSetPassword)(req.body);
    if (!valid) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }
    try {
        const result = await (0, user_service_1.setPasswordService)(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Failed to set password' });
    }
};
exports.setPassword = setPassword;
const getUsers = async (req, res) => {
    try {
        const users = await (0, user_service_1.getUsersService)(req.user.id, req.user.role);
        res.status(200).json({ users });
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const deleteUser = async (req, res) => {
    try {
        const result = await (0, user_service_1.deleteUserService)(req.params.id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Failed to delete user' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map