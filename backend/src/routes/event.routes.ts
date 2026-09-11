import { Router } from 'express';
import { 
  getPublicEvents, 
  getPublicEventBySlug,
  createEvent,
  getAdminEvents,
  updateEvent,
  deleteEvent
} from '../controllers/event.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicEventRoutes = Router();
publicEventRoutes.get('/', getPublicEvents);
publicEventRoutes.get('/:slug', getPublicEventBySlug);

export const adminEventRoutes = Router();
adminEventRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminEventRoutes.post('/', createEvent);
adminEventRoutes.get('/', getAdminEvents);
adminEventRoutes.put('/:id', updateEvent);
adminEventRoutes.delete('/:id', deleteEvent);
