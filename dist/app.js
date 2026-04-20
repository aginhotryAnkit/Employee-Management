"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const securityMiddleware_1 = require("./middlewares/securityMiddleware");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Security
app.use(securityMiddleware_1.helmetMiddleware);
app.use(securityMiddleware_1.corsMiddleware);
app.use(securityMiddleware_1.rateLimiter);
// Body parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api', routes_1.default);
// 404
app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// Global error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});
exports.default = app;
//# sourceMappingURL=app.js.map