import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

export const getPublicSports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sports = await prisma.sport.findMany({ include: { events: true, results: true } });
    sendSuccess(res, 'Sports retrieved', { data: sports });
  } catch (error) { next(error); }
};

export const getPublicActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await prisma.activity.findMany({ where: { status: 'PUBLISHED' } });
    sendSuccess(res, 'Activities retrieved', { data: activities });
  } catch (error) { next(error); }
};

export const getAdminSports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sports = await prisma.sport.findMany({ include: { events: true, results: true }, orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Sports retrieved', { data: sports });
  } catch (error) { next(error); }
};

export const getAdminActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await prisma.activity.findMany({ orderBy: { createdAt: 'desc' } });
    sendSuccess(res, 'Activities retrieved', { data: activities });
  } catch (error) { next(error); }
};

export const createSport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const sport = await prisma.sport.create({ data });
    sendSuccess(res, 'Sport created', { data: sport }, 201);
  } catch (error) { next(error); }
};

export const updateSport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const sport = await prisma.sport.update({ where: { id }, data });
    sendSuccess(res, 'Sport updated', { data: sport });
  } catch (error) { next(error); }
};

export const deleteSport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.sport.delete({ where: { id } });
    sendSuccess(res, 'Sport deleted', null);
  } catch (error) { next(error); }
};

export const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const activity = await prisma.activity.create({ data });
    sendSuccess(res, 'Activity created', { data: activity }, 201);
  } catch (error) { next(error); }
};

export const updateActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const activity = await prisma.activity.update({ where: { id }, data });
    sendSuccess(res, 'Activity updated', { data: activity });
  } catch (error) { next(error); }
};

export const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    await prisma.activity.delete({ where: { id } });
    sendSuccess(res, 'Activity deleted', null);
  } catch (error) { next(error); }
};
