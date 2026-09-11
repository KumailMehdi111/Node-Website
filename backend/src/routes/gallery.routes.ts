import { Router } from 'express';
import { 
  getPublicGallery, getPublicGalleryCategories,
  createGalleryImage, getAdminGallery, updateGalleryImage, deleteGalleryImage
} from '../controllers/gallery.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicGalleryRoutes = Router();
publicGalleryRoutes.get('/', getPublicGallery);
publicGalleryRoutes.get('/categories', getPublicGalleryCategories);

export const adminGalleryRoutes = Router();
adminGalleryRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminGalleryRoutes.post('/', createGalleryImage);
adminGalleryRoutes.get('/', getAdminGallery);
adminGalleryRoutes.put('/:id', updateGalleryImage);
adminGalleryRoutes.delete('/:id', deleteGalleryImage);
