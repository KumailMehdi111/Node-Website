import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { sendSuccess, sendError } from '../utils/response';
import { uploadLimiter } from '../middleware/rateLimiter';

export const uploadRoutes = Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

uploadRoutes.post(
  '/',
  authenticate,
  authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']),
  uploadLimiter,
  upload.single('file'),
  (req: MulterRequest, res: Response) => {
    try {
      if (!req.file) {
        return sendError(res, 'No file uploaded', {}, 400);
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      sendSuccess(res, 'File uploaded successfully', {
        fileUrl,
        fileName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
    } catch (error: any) {
      sendError(res, 'Upload failed', {}, 500);
    }
  }
);

// Handle multer errors
uploadRoutes.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return sendError(res, 'File too large. Maximum size is 15MB.', {}, 413);
  }
  if (err.message && err.message.includes('Invalid file type')) {
    return sendError(res, err.message, {}, 400);
  }
  sendError(res, 'Upload error', {}, 400);
});
