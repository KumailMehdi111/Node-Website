import { Router } from 'express';
import { 
  getPublicSettings,
  updateWebsiteSettings,
  updateSchoolInformation
} from '../controllers/settings.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicSettingsRoutes = Router();
publicSettingsRoutes.get('/', getPublicSettings);

export const adminSettingsRoutes = Router();
adminSettingsRoutes.use(authenticate, authorize(['SUPER_ADMIN'])); // Only Super Admin can change global settings
adminSettingsRoutes.put('/website', updateWebsiteSettings);
adminSettingsRoutes.put('/school', updateSchoolInformation);
