
import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';


export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expense = await prisma.expense.create({
      data: {
        amount: req.body.amount,
        description: req.body.description,
        userId: req.body.userId
      }
    });
    res.status(201).json(expense);


  } catch (err) {
    console.log(`Error en: ${err}`);
  }
}

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'An error occurred while fetching expenses' });
  }
}
