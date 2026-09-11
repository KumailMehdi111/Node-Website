import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schoolInfo = await prisma.schoolInformation.findFirst();
    const websiteSettings = await prisma.websiteSetting.findFirst();
    const socialLinks = await prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } });
    
    sendSuccess(res, 'Settings retrieved successfully', {
      schoolInformation: schoolInfo,
      websiteSettings,
      socialLinks
    });
  } catch (error) {
    next(error);
  }
};

export const updateWebsiteSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    let settings = await prisma.websiteSetting.findFirst();
    
    if (settings) {
      settings = await prisma.websiteSetting.update({ where: { id: settings.id }, data });
    } else {
      settings = await prisma.websiteSetting.create({ data });
    }
    
    sendSuccess(res, 'Website settings updated', { data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSchoolInformation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    let info = await prisma.schoolInformation.findFirst();
    
    if (info) {
      info = await prisma.schoolInformation.update({ where: { id: info.id }, data });
    } else {
      info = await prisma.schoolInformation.create({ data });
    }
    
    sendSuccess(res, 'School information updated', { data: info });
  } catch (error) {
    next(error);
  }
};
