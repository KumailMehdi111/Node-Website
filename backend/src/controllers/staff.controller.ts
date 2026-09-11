import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string || '';
    const department = req.query.department as string || '';
    
    const whereClause: any = { status: 'active' };
    if (search) {
      whereClause.name = { contains: search, mode: 'insensitive' };
    }
    if (department) {
      whereClause.department = { name: { contains: department, mode: 'insensitive' } };
    }

    const staff = await prisma.staff.findMany({
      where: whereClause,
      include: { department: true },
      orderBy: { displayOrder: 'asc' }
    });
    
    sendSuccess(res, 'Staff retrieved successfully', { data: staff });
  } catch (error) {
    next(error);
  }
};

export const getPublicStaffBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const staff = await prisma.staff.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: { department: true }
    });
    if (!staff) return sendError(res, 'Staff member not found', null, 404);
    sendSuccess(res, 'Staff member retrieved successfully', { data: staff });
  } catch (error) {
    next(error);
  }
};

export const createStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const staff = await prisma.staff.create({ data });
    sendSuccess(res, 'Staff created successfully', { data: staff }, 201);
  } catch (error) {
    next(error);
  }
};

export const getAdminStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await prisma.staff.findMany({
      include: { department: true },
      orderBy: { createdAt: 'desc' }
    });
    sendSuccess(res, 'Staff retrieved successfully', { data: staff });
  } catch (error) {
    next(error);
  }
};

export const updateStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const staff = await prisma.staff.update({ where: { id }, data });
    sendSuccess(res, 'Staff updated successfully', { data: staff });
  } catch (error) {
    next(error);
  }
};

export const deleteStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.staff.delete({ where: { id } });
    sendSuccess(res, 'Staff deleted successfully', null, 204);
  } catch (error) {
    next(error);
  }
};
