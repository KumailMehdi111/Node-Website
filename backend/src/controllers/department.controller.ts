import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicDepartments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } });
    sendSuccess(res, 'Departments retrieved', { data: departments });
  } catch (error) { next(error); }
};

export const getAdminDepartments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const departments = await prisma.department.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Departments retrieved', { data: departments });
  } catch (error) { next(error); }
};

export const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const department = await prisma.department.create({ data });
    sendSuccess(res, 'Department created', { data: department }, 201);
  } catch (error) { next(error); }
};

export const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const department = await prisma.department.update({ where: { id }, data });
    sendSuccess(res, 'Department updated', { data: department });
  } catch (error) { next(error); }
};

export const deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.department.delete({ where: { id } });
    sendSuccess(res, 'Department deleted', null, 204);
  } catch (error) { next(error); }
};
