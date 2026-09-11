import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const changeCredentialsSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  name: z.string().min(1).max(100).optional(),
  newEmail: z.string().email('Valid email is required').optional(),
  newPassword: z.string().min(8, 'New password must be at least 8 characters').optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
});

export const inquirySchema = z.object({
  parentName: z.string().min(1, 'Parent name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(20).optional(),
  studentName: z.string().min(1, 'Student name is required').max(100),
  grade: z.string().min(1, 'Grade is required').max(20),
  message: z.string().max(5000).optional(),
});

export const announcementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  category: z.string().max(100).optional(),
  content: z.string().min(1, 'Content is required'),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  featuredFlag: z.boolean().optional(),
  featuredImage: z.string().max(500).optional(),
});

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().max(200).optional(),
  image: z.string().max(500).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export const staffSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(200),
  photo: z.string().max(500).optional(),
  designation: z.string().min(1, 'Designation is required').max(100),
  departmentId: z.string().uuid().optional(),
  subject: z.string().max(100).optional(),
  qualification: z.string().max(200).optional(),
  experience: z.string().max(100).optional(),
  bio: z.string().max(5000).optional(),
  displayOrder: z.number().int().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'active', 'inactive']).optional(),
});

export const galleryImageSchema = z.object({
  title: z.string().max(200).optional(),
  caption: z.string().max(500).optional(),
  fileUrl: z.string().min(1, 'File URL is required').max(500),
  categoryId: z.string().uuid().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  displayOrder: z.number().int().optional(),
});

export const sportSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(5000).optional(),
  category: z.string().max(50).optional(),
  coach: z.string().max(100).optional(),
  image: z.string().max(500).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const activitySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(5000).optional(),
  category: z.string().max(100).optional(),
  image: z.string().max(500).optional(),
  date: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export const departmentSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100),
  description: z.string().max(5000).optional(),
  displayOrder: z.number().int().optional(),
});

export const messageStatusSchema = z.object({
  status: z.enum(['Unread', 'Read', 'Replied', 'Archived']),
});

export const inquiryStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'ENROLLED', 'CLOSED']).optional(),
  note: z.string().max(5000).optional(),
});
