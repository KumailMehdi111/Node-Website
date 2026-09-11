import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

// Public API
export const getPublicAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    
    const whereClause: any = { status: 'PUBLISHED' };
    if (search) {
      whereClause.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const total = await prisma.announcement.count({ where: whereClause });
    const announcements = await prisma.announcement.findMany({
      where: whereClause,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      orderBy: { createdAt: 'desc' }
    });

    sendSuccess(res, 'Announcements retrieved successfully', {
      data: announcements,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicAnnouncementBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const announcement = await prisma.announcement.findFirst({
      where: { slug, status: 'PUBLISHED' }
    });

    if (!announcement) return sendError(res, 'Announcement not found', null, 404);

    sendSuccess(res, 'Announcement retrieved successfully', { data: announcement });
  } catch (error) {
    next(error);
  }
};

// Admin API
export const createAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, slug, category, content, status, featuredFlag, featuredImage } = req.body;
    
    const announcement = await prisma.announcement.create({
      data: { title, slug, category, content, status, featuredFlag, featuredImage: featuredImage || null }
    });
    
    sendSuccess(res, 'Announcement created successfully', { data: announcement }, 201);
  } catch (error) {
    next(error);
  }
};

export const getAdminAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    sendSuccess(res, 'Announcements retrieved successfully', { data: announcements });
  } catch (error) {
    next(error);
  }
};

export const getAdminAnnouncementById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const announcement = await prisma.announcement.findUnique({ where: { id } });
    if (!announcement) return sendError(res, 'Announcement not found', null, 404);
    sendSuccess(res, 'Announcement retrieved successfully', { data: announcement });
  } catch (error) {
    next(error);
  }
};

export const updateAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { title, slug, category, content, status, featuredFlag, featuredImage } = req.body;
    
    const announcement = await prisma.announcement.update({
      where: { id },
      data: { title, slug, category, content, status, featuredFlag, featuredImage: featuredImage || null }
    });
    
    sendSuccess(res, 'Announcement updated successfully', { data: announcement });
  } catch (error) {
    next(error);
  }
};

export const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.announcement.delete({ where: { id } });
    sendSuccess(res, 'Announcement deleted successfully', null, 204);
  } catch (error) {
    next(error);
  }
};
