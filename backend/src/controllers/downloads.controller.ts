import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicDownloads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const downloads = await prisma.download.findMany({ where: { status: 'PUBLISHED' } });
    sendSuccess(res, 'Downloads retrieved', { data: downloads });
  } catch (error) { next(error); }
};

export const createDownload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const download = await prisma.download.create({ data });
    sendSuccess(res, 'Download created', { data: download }, 201);
  } catch (error) { next(error); }
};

export const getAdminDownloads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const downloads = await prisma.download.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Admin downloads retrieved', { data: downloads });
  } catch (error) { next(error); }
};
