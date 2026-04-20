"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const auth_service_1 = require("./auth.service");
const auth_validator_1 = require("./auth.validator");
const signup = async (req, res) => {
    const { valid, errors } = (0, auth_validator_1.validateSignup)(req.body);
    if (!valid) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }
    try {
        const result = await (0, auth_service_1.signupService)(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Signup failed' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { valid, errors } = (0, auth_validator_1.validateLogin)(req.body);
    if (!valid) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }
    try {
        const result = await (0, auth_service_1.loginService)(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Login failed' });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map