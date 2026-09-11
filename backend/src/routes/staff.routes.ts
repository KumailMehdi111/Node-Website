import { Router } from 'express';
import { 
  getPublicStaff, getPublicStaffBySlug,
  createStaff, getAdminStaff, updateStaff, deleteStaff
} from '../controllers/staff.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicStaffRoutes = Router();
publicStaffRoutes.get('/', getPublicStaff);
publicStaffRoutes.get('/:slug', getPublicStaffBySlug);

export const adminStaffRoutes = Router();
adminStaffRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminStaffRoutes.post('/', createStaff);
adminStaffRoutes.get('/', getAdminStaff);
adminStaffRoutes.put('/:id', updateStaff);
adminStaffRoutes.delete('/:id', deleteStaff);
