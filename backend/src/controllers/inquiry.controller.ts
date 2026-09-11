import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { inquirySchema } from '../validators/schemas';

export const submitInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = inquirySchema.parse(req.body);
    const inquiry = await prisma.admissionInquiry.create({ data });
    sendSuccess(res, 'Inquiry submitted successfully', { data: inquiry }, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return sendError(res, 'Validation error', error.errors, 400);
    }
    next(error);
  }
};

export const getAdminInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inquiries = await prisma.admissionInquiry.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Inquiries retrieved', { data: inquiries });
  } catch (error) { next(error); }
};

export const updateInquiryStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { status, note } = req.body;
    const updateData: any = {};
    if (status && ['NEW', 'CONTACTED', 'ENROLLED', 'CLOSED'].includes(status)) {
      updateData.status = status;
    }
    if (note !== undefined) updateData.note = note;
    if (Object.keys(updateData).length === 0) {
      return sendError(res, 'No valid fields to update', {}, 400);
    }
    const inquiry = await prisma.admissionInquiry.update({ where: { id }, data: updateData });
    sendSuccess(res, 'Inquiry updated', { data: inquiry });
  } catch (error) { next(error); }
};

export const deleteInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.admissionInquiry.delete({ where: { id } });
    sendSuccess(res, 'Inquiry deleted', null);
  } catch (error) { next(error); }
};
