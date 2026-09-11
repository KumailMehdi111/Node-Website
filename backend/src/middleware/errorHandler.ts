import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.code === 'P2002') {
    statusCode = 409;
    const target = (err as any).meta?.target;
    message = `Duplicate value for field: ${Array.isArray(target) ? target.join(', ') : 'unknown'}. Please use a different value.`;
  } else if (err.code === 'P2003') {
    statusCode = 400;
    message = 'Related record not found. Please check your input.';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found.';
  }

  // Always log internally (never expose to client)
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${statusCode}: ${message}`);

  // Never leak stack traces or internal details to the client
  res.status(statusCode).json({
    success: false,
    message,
  });
};
