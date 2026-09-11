import { Router } from 'express';
import { 
  getClasses, createClass,
  getBooks, createBook,
  getTimetables, createTimetable,
  getExamGuidelines
} from '../controllers/academics.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const publicAcademicsRoutes = Router();
publicAcademicsRoutes.get('/classes', getClasses);
publicAcademicsRoutes.get('/books', getBooks);
publicAcademicsRoutes.get('/timetables', getTimetables);
publicAcademicsRoutes.get('/exam-guidelines', getExamGuidelines);

export const adminAcademicsRoutes = Router();
adminAcademicsRoutes.use(authenticate, authorize(['SUPER_ADMIN', 'ACADEMIC_MANAGER']));
adminAcademicsRoutes.post('/classes', createClass);
adminAcademicsRoutes.post('/books', createBook);
adminAcademicsRoutes.post('/timetables', createTimetable);
