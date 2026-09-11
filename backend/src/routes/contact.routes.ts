import { Router } from 'express';
import { submitContactForm, getAdminContactMessages, updateMessageStatus, deleteContactMessage } from '../controllers/contact.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { publicPostLimiter } from '../middleware/rateLimiter';

export const publicContactRoutes = Router();
publicContactRoutes.post('/', publicPostLimiter, submitContactForm);

export const adminContactRoutes = Router();
adminContactRoutes.use(authenticate, authorize(['SUPER_ADMIN']));
adminContactRoutes.get('/', getAdminContactMessages);
adminContactRoutes.patch('/:id/status', updateMessageStatus);
adminContactRoutes.delete('/:id', deleteContactMessage);
