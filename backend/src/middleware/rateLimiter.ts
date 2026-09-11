import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 minutes
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts. Please try again in 15 minutes.',
      retryAfter: 900,
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per 15 min per IP
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const publicPostLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 submissions per minute
  message: {
    success: false,
    message: 'Too many submissions. Please try again in a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 uploads per minute
  message: {
    success: false,
    message: 'Too many uploads. Please try again in a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
