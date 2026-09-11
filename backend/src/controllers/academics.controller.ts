import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendSuccess, sendError } from '../utils/response';

// Classes
export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classes = await prisma.class.findMany({ orderBy: { displayOrder: 'asc' } });
    sendSuccess(res, 'Classes retrieved', { data: classes });
  } catch (error) { next(error); }
};
export const createClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newClass = await prisma.class.create({ data });
    sendSuccess(res, 'Class created', { data: newClass }, 201);
  } catch (error) { next(error); }
};

// Books
export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await prisma.book.findMany({ include: { class: true } });
    sendSuccess(res, 'Books retrieved', { data: books });
  } catch (error) { next(error); }
};
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newBook = await prisma.book.create({ data });
    sendSuccess(res, 'Book created', { data: newBook }, 201);
  } catch (error) { next(error); }
};

// Timetable
export const getTimetables = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const timetables = await prisma.timetable.findMany({ include: { class: true } });
    sendSuccess(res, 'Timetables retrieved', { data: timetables });
  } catch (error) { next(error); }
};
export const createTimetable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newTimetable = await prisma.timetable.create({ data });
    sendSuccess(res, 'Timetable created', { data: newTimetable }, 201);
  } catch (error) { next(error); }
};

// Exam Guidelines
export const getExamGuidelines = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guidelines = await prisma.examGuideline.findMany({ orderBy: { displayOrder: 'asc' } });
    sendSuccess(res, 'Guidelines retrieved', { data: guidelines });
  } catch (error) { next(error); }
};
