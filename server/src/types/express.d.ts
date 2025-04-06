import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role?: string; // Add more fields as needed
      };
    }
  }
}
