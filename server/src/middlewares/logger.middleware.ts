import { Response, NextFunction, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createRequestLogger } from '../logger';
import { CustomRequest } from '../utils/custom.request';

const loggerMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const startTime = process.hrtime(); // Capture start time

    // Attach logger to request
    req.requestId = uuidv4();
    req.logger = createRequestLogger(req);

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(startTime);
        const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2); // Convert to milliseconds

        req.logger?.info({
            responseTime: `${responseTime}ms`,
            statusCode: res.statusCode,
            message: 'Request completed',
        });
    });

    next(); // Proceed to the next middleware
};

export default loggerMiddleware;
