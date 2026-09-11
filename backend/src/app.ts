import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

const app: Application = express();

// Trust proxy (for rate-limiter IP behind reverse proxy)
app.set('trust proxy', 1);

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// CORS — use configured origin or allow all in dev
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : [];

app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  credentials: true,
}));

// Body parsing with size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global rate limiter (applied to all routes below)
app.use('/api/', apiLimiter);

// Health Check Route (no rate limit)
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is running normally' });
});

app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'School Website API is running',
    timestamp: new Date().toISOString()
  });
});

import authRoutes from './routes/auth.routes';
import { publicAnnouncementRoutes, adminAnnouncementRoutes } from './routes/announcement.routes';
import { publicEventRoutes, adminEventRoutes } from './routes/event.routes';
import { uploadRoutes } from './routes/upload.routes';
import { publicStaffRoutes, adminStaffRoutes } from './routes/staff.routes';
import { publicGalleryRoutes, adminGalleryRoutes } from './routes/gallery.routes';
import { publicSettingsRoutes, adminSettingsRoutes } from './routes/settings.routes';
import { publicAcademicsRoutes, adminAcademicsRoutes } from './routes/academics.routes';
import { publicContactRoutes, adminContactRoutes } from './routes/contact.routes';
import { publicDownloadsRoutes, adminDownloadsRoutes } from './routes/downloads.routes';
import { publicSportsRoutes, publicActivitiesRoutes, adminSportsRoutes, adminActivitiesRoutes } from './routes/sports.routes';
import { publicDepartmentRoutes, adminDepartmentRoutes } from './routes/department.routes';
import { publicAdmissionsRoutes, adminAdmissionsRoutes } from './routes/admissions.routes';
import { publicInquiryRoutes, adminInquiryRoutes } from './routes/inquiry.routes';
import path from 'path';

// Serve static files with long cache
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'), {
  maxAge: '30d',
  immutable: true,
  etag: true,
}));

// API Routes
app.use('/api/v1/auth', authRoutes);

// Public Routes
app.use('/api/v1/public/announcements', publicAnnouncementRoutes);
app.use('/api/v1/public/events', publicEventRoutes);
app.use('/api/v1/public/staff', publicStaffRoutes);
app.use('/api/v1/public/gallery', publicGalleryRoutes);
app.use('/api/v1/public/settings', publicSettingsRoutes);
app.use('/api/v1/public/academics', publicAcademicsRoutes);
app.use('/api/v1/public/contact', publicContactRoutes);
app.use('/api/v1/public/downloads', publicDownloadsRoutes);
app.use('/api/v1/public/sports', publicSportsRoutes);
app.use('/api/v1/public/activities', publicActivitiesRoutes);
app.use('/api/v1/public/departments', publicDepartmentRoutes);
app.use('/api/v1/public/admissions', publicAdmissionsRoutes);
app.use('/api/v1/public/admissions/inquiry', publicInquiryRoutes);

// Admin Routes
app.use('/api/v1/admin/announcements', adminAnnouncementRoutes);
app.use('/api/v1/admin/events', adminEventRoutes);
app.use('/api/v1/admin/staff', adminStaffRoutes);
app.use('/api/v1/admin/gallery', adminGalleryRoutes);
app.use('/api/v1/admin/settings', adminSettingsRoutes);
app.use('/api/v1/admin/academics', adminAcademicsRoutes);
app.use('/api/v1/admin/contact-messages', adminContactRoutes);
app.use('/api/v1/admin/downloads', adminDownloadsRoutes);
app.use('/api/v1/admin/sports', adminSportsRoutes);
app.use('/api/v1/admin/activities', adminActivitiesRoutes);
app.use('/api/v1/admin/departments', adminDepartmentRoutes);
app.use('/api/v1/admin/admissions', adminAdmissionsRoutes);
app.use('/api/v1/admin/admission-inquiries', adminInquiryRoutes);
app.use('/api/v1/admin/upload', uploadRoutes);

// Swagger — only in development
if (process.env.NODE_ENV !== 'production') {
  import('swagger-ui-express').then(swaggerUi => {
    import('./config/swagger').then(({ swaggerSpec }) => {
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    });
  });
}

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;
