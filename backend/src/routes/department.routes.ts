import { Router } from 'express';
import {
  getPublicDepartments,
  getAdminDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/department.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicDepartmentRoutes = Router();
publicDepartmentRoutes.get('/', getPublicDepartments);

export const adminDepartmentRoutes = Router();
adminDepartmentRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminDepartmentRoutes.get('/', getAdminDepartments);
adminDepartmentRoutes.post('/', createDepartment);
adminDepartmentRoutes.put('/:id', updateDepartment);
adminDepartmentRoutes.delete('/:id', deleteDepartment);
