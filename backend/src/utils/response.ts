export const sendSuccess = (res: any, message: string, data: any = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res: any, message: string, error: any = {}, statusCode = 400) => {
  // Never expose internal error details to the client in production
  const safeError = process.env.NODE_ENV === 'production' ? {} : error;
  return res.status(statusCode).json({
    success: false,
    message,
    error: safeError,
  });
};
