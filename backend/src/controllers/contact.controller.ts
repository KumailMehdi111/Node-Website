import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { contactFormSchema } from '../validators/schemas';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = contactFormSchema.parse(req.body);
    const message = await prisma.contactMessage.create({ data });
    sendSuccess(res, 'Message submitted successfully', { data: message }, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return sendError(res, 'Validation error', error.errors, 400);
    }
    next(error);
  }
};

export const getAdminContactMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Messages retrieved', { data: messages });
  } catch (error) { next(error); }
};

export const updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    if (!status || !['Unread', 'Read', 'Replied', 'Archived'].includes(status)) {
      return sendError(res, 'Invalid status value', {}, 400);
    }
    const message = await prisma.contactMessage.update({ where: { id }, data: { status } });
    sendSuccess(res, 'Message status updated', { data: message });
  } catch (error) { next(error); }
};

export const deleteContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.contactMessage.delete({ where: { id } });
    sendSuccess(res, 'Message deleted', null);
  } catch (error) { next(error); }
};
