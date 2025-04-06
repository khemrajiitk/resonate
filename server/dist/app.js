"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_middleware_1 = __importDefault(require("./middlewares/logger.middleware"));
const app = (0, express_1.default)();
app.use(logger_middleware_1.default);
// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests from localhost:5173 and *.xyz.ai
        //TODO: can update later
        const allowedOrigins = ['http://localhost:5173', '*'];
        const wildcardDomain = /\.xyz\.ai$/;
        if (!origin || allowedOrigins.includes(origin) || wildcardDomain.test(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions)); // Enable CORS with the specified options
app.use(express_1.default.json());
// Prefix all routes with /v1
app.use('/v1', routes_1.default);
// Global error handling middleware (must be after all routes)
app.use(error_middleware_1.errorHandler);
exports.default = app;
