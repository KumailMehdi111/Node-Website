import { Router } from 'express';
import { 
  getPublicAnnouncements, 
  getPublicAnnouncementBySlug,
  createAnnouncement,
  getAdminAnnouncements,
  getAdminAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} from '../controllers/announcement.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicAnnouncementRoutes = Router();
publicAnnouncementRoutes.get('/', getPublicAnnouncements);
publicAnnouncementRoutes.get('/:slug', getPublicAnnouncementBySlug);

export const adminAnnouncementRoutes = Router();
// Content Managers and Super Admins can manage announcements
adminAnnouncementRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminAnnouncementRoutes.post('/', createAnnouncement);
adminAnnouncementRoutes.get('/', getAdminAnnouncements);
adminAnnouncementRoutes.get('/:id', getAdminAnnouncementById);
adminAnnouncementRoutes.put('/:id', updateAnnouncement);
adminAnnouncementRoutes.delete('/:id', deleteAnnouncement);
