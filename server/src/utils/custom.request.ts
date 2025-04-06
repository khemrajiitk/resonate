import { Request } from 'express';
import { Logger } from 'pino';

export interface CustomRequest extends Request {
    user?: {
        id: string;
        email: string;
        role?: string;
    };
    requestId?: string;
    logger?: Logger;
}