import { Router } from 'express';
import { 
  getPublicSports, getPublicActivities,
  createSport, createActivity,
  getAdminSports, getAdminActivities,
  updateSport, deleteSport,
  updateActivity, deleteActivity
} from '../controllers/sports.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicSportsRoutes = Router();
publicSportsRoutes.get('/', getPublicSports);

export const publicActivitiesRoutes = Router();
publicActivitiesRoutes.get('/', getPublicActivities);

export const adminSportsRoutes = Router();
adminSportsRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminSportsRoutes.get('/', getAdminSports);
adminSportsRoutes.post('/', createSport);
adminSportsRoutes.put('/:id', updateSport);
adminSportsRoutes.delete('/:id', deleteSport);

export const adminActivitiesRoutes = Router();
adminActivitiesRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'CONTENT_MANAGER']));
adminActivitiesRoutes.get('/', getAdminActivities);
adminActivitiesRoutes.post('/', createActivity);
adminActivitiesRoutes.put('/:id', updateActivity);
adminActivitiesRoutes.delete('/:id', deleteActivity);
