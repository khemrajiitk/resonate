import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET is not defined in the environment variables');
}

export interface AuthenticatedRequest extends Request {
  user?: any; // You can type this with a specific User type if you want
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '🚫 Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error);
    return res.status(401).json({ message: '🚫 Unauthorized: Invalid token' });
  }
};
