import { Router } from 'express';
import { submitInquiry, getAdminInquiries, updateInquiryStatus, deleteInquiry } from '../controllers/inquiry.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { publicPostLimiter } from '../middleware/rateLimiter';

export const publicInquiryRoutes = Router();
publicInquiryRoutes.post('/', publicPostLimiter, submitInquiry);

export const adminInquiryRoutes = Router();
adminInquiryRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'ADMISSIONS_MANAGER']));
adminInquiryRoutes.get('/', getAdminInquiries);
adminInquiryRoutes.patch('/:id/status', updateInquiryStatus);
adminInquiryRoutes.delete('/:id', deleteInquiry);
