import { Router } from 'express';
import { 
  getPublicDownloads, createDownload, getAdminDownloads 
} from '../controllers/downloads.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicDownloadsRoutes = Router();
publicDownloadsRoutes.get('/', getPublicDownloads);

export const adminDownloadsRoutes = Router();
adminDownloadsRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminDownloadsRoutes.post('/', createDownload);
adminDownloadsRoutes.get('/', getAdminDownloads);
