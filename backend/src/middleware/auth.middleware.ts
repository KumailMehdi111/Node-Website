import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import prisma from '../config/prisma';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication required', null, 401);
    }

    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is missing');

    const decoded = verifyToken(token, process.env.JWT_SECRET) as any;
    if (!decoded) {
      return sendError(res, 'Invalid or expired token', null, 401);
    }

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user || user.status !== 'ACTIVE') {
      return sendError(res, 'User not found or inactive', null, 401);
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 'Access denied', null, 403);
    }
    next();
  };
};
