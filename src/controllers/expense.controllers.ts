
import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import type { Prisma } from "@prisma/client";
import { z } from 'zod';
import type { AuthRequest } from '../middlewares/auth.middleware.js';


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

export const deteleExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenseId = z.number().parse(req.params.id);

    const deleteExpense = await prisma.expense.delete({
      where: { id: expenseId }
    });

    if (!deleteExpense) return res.status(404).json({ error: "Gasto o item no encontrado." });

    res.status(200).json({ message: "Item eliminado." });
  } catch (err) {
    console.log(`Error en: ${err}`);
  }
}

export const getMyExpenses = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Usuario no autenticado" });

    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        date: "desc"
      }

    });
    res.status(200).json(expenses);

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
}

export const updateExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Usuario no autenticado" });

    if (!req.params.id) return res.status(400).json({ error: "ID del gasto no proporcionado" });

    const expenseId = z.coerce.number().parse(req.params.id);
    const { amount, description, date } = req.body;

    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId: req.user.userId
      }
    });

    if (!existingExpense) return res.status(404).json({ error: "Gasto no encontrado" });

    const dataToUpdate: Prisma.ExpenseUpdateInput = {
      amount,
      description
    };


    if (date) dataToUpdate.date = new Date(date);

    const expenses = await prisma.expense.update({
      where: {
        id: expenseId,
      },

      data: {
        amount,
        description,

      }

    });
    res.status(200).json(expenses);

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
}
