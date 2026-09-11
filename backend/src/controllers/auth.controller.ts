import { Request, Response, NextFunction } from 'express';
import * as argon2 from 'argon2';
import prisma from '../config/prisma';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { loginSchema, changeCredentialsSchema } from '../validators/schemas';
import { AuthRequest } from '../middleware/auth.middleware';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user || user.status !== 'ACTIVE') {
      return sendError(res, 'Invalid credentials', {}, 401);
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, data.password);
    if (!isPasswordValid) {
      // Log failed attempt
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'FAILED_LOGIN',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent']
        }
      });
      return sendError(res, 'Invalid credentials', {}, 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    // Update lastLogin
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
    });

    sendSuccess(res, 'Login successful', {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
      refreshToken
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return sendError(res, 'Validation error', error.errors, 400);
    }
    next(error);
  }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken }
      });
    }

    if (req.user) {
      await prisma.auditLog.create({
        data: {
          userId: req.user.id,
          action: 'LOGOUT',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent']
        }
      });
    }

    sendSuccess(res, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return sendError(res, 'Refresh token required', {}, 400);

    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) as any;
    if (!decoded) return sendError(res, 'Invalid refresh token', {}, 401);

    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      // Clean up expired token
      if (tokenRecord) {
        await prisma.refreshToken.delete({ where: { token: refreshToken } });
      }
      return sendError(res, 'Expired refresh token', {}, 401);
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.status !== 'ACTIVE') {
      return sendError(res, 'User not found or inactive', {}, 401);
    }

    // Rotate refresh token: delete old, issue new
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    const newRefreshToken = generateRefreshToken(user);
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    const newAccessToken = generateAccessToken(user);
    sendSuccess(res, 'Token refreshed', { accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return sendError(res, 'Not authenticated', {}, 401);

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, status: true, lastLogin: true }
    });

    if (!user) return sendError(res, 'User not found', {}, 404);

    sendSuccess(res, 'User retrieved', { user });
  } catch (error) {
    next(error);
  }
};

export const changeCredentials = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return sendError(res, 'Not authenticated', {}, 401);

    const data = changeCredentialsSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return sendError(res, 'User not found', {}, 404);

    // Always verify current password
    const valid = await argon2.verify(user.passwordHash, data.currentPassword);
    if (!valid) {
      return sendError(res, 'Current password is incorrect', {}, 400);
    }

    const updateData: any = {};

    if (data.name) updateData.name = data.name;

    if (data.newEmail && data.newEmail !== user.email) {
      const existing = await prisma.user.findUnique({ where: { email: data.newEmail } });
      if (existing) return sendError(res, 'Email already in use', {}, 409);
      updateData.email = data.newEmail;
    }

    if (data.newPassword) {
      updateData.passwordHash = await argon2.hash(data.newPassword);
    }

    if (Object.keys(updateData).length === 0) {
      return sendError(res, 'No changes provided', {}, 400);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true }
    });

    // Revoke all refresh tokens on credential change (forces re-login everywhere)
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE_CREDENTIALS',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
    });

    sendSuccess(res, 'Credentials updated successfully. Please log in again.', { user: updated });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return sendError(res, 'Validation error', error.errors, 400);
    }
    next(error);
  }
};
