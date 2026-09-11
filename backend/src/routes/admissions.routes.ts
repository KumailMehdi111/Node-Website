import { Router } from 'express';
import {
  getPublicAdmissions,
  getAdminNotices,
  createAdmissionNotice,
  updateAdmissionNotice,
  deleteAdmissionNotice,
  getAdminFees,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure
} from '../controllers/admissions.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicAdmissionsRoutes = Router();
publicAdmissionsRoutes.get('/', getPublicAdmissions);

export const adminAdmissionsRoutes = Router();
adminAdmissionsRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'ADMISSIONS_MANAGER']));
adminAdmissionsRoutes.get('/notices', getAdminNotices);
adminAdmissionsRoutes.post('/notices', createAdmissionNotice);
adminAdmissionsRoutes.put('/notices/:id', updateAdmissionNotice);
adminAdmissionsRoutes.delete('/notices/:id', deleteAdmissionNotice);
adminAdmissionsRoutes.get('/fees', getAdminFees);
adminAdmissionsRoutes.post('/fees', createFeeStructure);
adminAdmissionsRoutes.put('/fees/:id', updateFeeStructure);
adminAdmissionsRoutes.delete('/fees/:id', deleteFeeStructure);
