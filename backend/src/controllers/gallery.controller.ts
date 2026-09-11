import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true },
      orderBy: { displayOrder: 'asc' }
    });
    sendSuccess(res, 'Gallery images retrieved successfully', { data: images });
  } catch (error) {
    next(error);
  }
};

export const getPublicGalleryCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.galleryCategory.findMany();
    sendSuccess(res, 'Gallery categories retrieved', { data: categories });
  } catch (error) {
    next(error);
  }
};

export const createGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const image = await prisma.galleryImage.create({ data });
    sendSuccess(res, 'Image added to gallery', { data: image }, 201);
  } catch (error) {
    next(error);
  }
};

export const getAdminGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await prisma.galleryImage.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
    sendSuccess(res, 'Admin gallery retrieved', { data: images });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const image = await prisma.galleryImage.update({ where: { id }, data });
    sendSuccess(res, 'Gallery image updated', { data: image });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.galleryImage.delete({ where: { id } });
    sendSuccess(res, 'Gallery image deleted', null, 204);
  } catch (error) {
    next(error);
  }
};
