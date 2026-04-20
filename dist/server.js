"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await database_1.default.authenticate();
        console.log('✔ Database connected');
        app_1.default.listen(PORT, () => console.log(`✔ Server running on port ${PORT}`));
    }
    catch (err) {
        console.error('✘ Failed to start server:', err.message);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map