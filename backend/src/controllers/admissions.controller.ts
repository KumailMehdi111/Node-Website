import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicAdmissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notices = await prisma.admissionNotice.findMany({ where: { status: 'PUBLISHED' } });
    const feeStructure = await prisma.feeStructure.findMany({ where: { status: 'PUBLISHED' } });
    sendSuccess(res, 'Admissions info retrieved', { notices, feeStructure });
  } catch (error) { next(error); }
};

export const getAdminNotices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notices = await prisma.admissionNotice.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Notices retrieved', { data: notices });
  } catch (error) { next(error); }
};

export const createAdmissionNotice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const notice = await prisma.admissionNotice.create({ data });
    sendSuccess(res, 'Notice created', { data: notice }, 201);
  } catch (error) { next(error); }
};

export const updateAdmissionNotice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const notice = await prisma.admissionNotice.update({ where: { id }, data: req.body });
    sendSuccess(res, 'Notice updated', { data: notice });
  } catch (error) { next(error); }
};

export const deleteAdmissionNotice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.admissionNotice.delete({ where: { id } });
    sendSuccess(res, 'Notice deleted', null);
  } catch (error) { next(error); }
};

export const getAdminFees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fees = await prisma.feeStructure.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Fee structures retrieved', { data: fees });
  } catch (error) { next(error); }
};

export const createFeeStructure = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const fee = await prisma.feeStructure.create({ data });
    sendSuccess(res, 'Fee structure created', { data: fee }, 201);
  } catch (error) { next(error); }
};

export const updateFeeStructure = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const fee = await prisma.feeStructure.update({ where: { id }, data: req.body });
    sendSuccess(res, 'Fee structure updated', { data: fee });
  } catch (error) { next(error); }
};

export const deleteFeeStructure = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.feeStructure.delete({ where: { id } });
    sendSuccess(res, 'Fee structure deleted', null);
  } catch (error) { next(error); }
};
