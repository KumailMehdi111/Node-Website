import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { date: 'asc' }
    });
    sendSuccess(res, 'Events retrieved successfully', { data: events });
  } catch (error) {
    next(error);
  }
};

export const getPublicEventBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const event = await prisma.event.findFirst({
      where: { slug, status: 'PUBLISHED' }
    });
    if (!event) return sendError(res, 'Event not found', null, 404);
    sendSuccess(res, 'Event retrieved successfully', { data: event });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, slug, description, date, startTime, endTime, location, image, status } = req.body;
    
    const event = await prisma.event.create({
      data: { 
        title, slug, description, date: new Date(date), 
        startTime, endTime, location, image, status 
      }
    });
    
    sendSuccess(res, 'Event created successfully', { data: event }, 201);
  } catch (error) {
    next(error);
  }
};

export const getAdminEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Events retrieved successfully', { data: events });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { title, slug, description, date, startTime, endTime, location, image, status } = req.body;
    
    const event = await prisma.event.update({
      where: { id },
      data: { 
        title, slug, description, 
        ...(date && { date: new Date(date) }), 
        startTime, endTime, location, image, status 
      }
    });
    
    sendSuccess(res, 'Event updated successfully', { data: event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.event.delete({ where: { id } });
    sendSuccess(res, 'Event deleted successfully', null, 204);
  } catch (error) {
    next(error);
  }
};
