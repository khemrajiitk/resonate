import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../utils/custom.request';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET is not defined in the environment variables');
}

// Type guard to ensure decoded is a JwtPayload
function isJwtPayload(decoded: any): decoded is JwtPayload {
  return decoded && typeof decoded === 'object' && 'id' in decoded && 'email' in decoded;
}

export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Use the type guard to check if decoded is a JwtPayload
    if (!isJwtPayload(decoded)) {
      return res.status(401).json({ message: '🚫 Unauthorized: Invalid token' });
    }

    // Attach decoded data to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error);
    return res.status(401).json({ message: '🚫 Unauthorized: Invalid token' });
  }
};
