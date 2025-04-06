import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';
import { CustomRequest } from './utils/custom.request';

// Base logger instance
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true, // Enable colored logs in development
            },
        }
        : undefined, // Use JSON logs in production for monitoring tools like Grafana
});

/**
 * Creates a request-specific logger.
 * Ensures every request has a unique `requestId`.
 * Redacts sensitive headers for security.
 */
export const createRequestLogger = (req: CustomRequest) => {
    if (!req.requestId) {
        req.requestId = uuidv4(); // Generate a unique request ID
    }
    return logger.child({
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl || req.url,
        userId: req.user?.id || 'Anonymous',
        headers: {
            ...req.headers,
            authorization: '[REDACTED]', // Remove sensitive data
            cookie: '[REDACTED]',
        },
        remoteAddress: req.socket?.remoteAddress || 'unknown',
    });
};

export default logger;