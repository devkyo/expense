import { Router } from 'express';
import { createExpense, getMyExpenses, updateExpense, deteleExpense } from '../controllers/expense.controllers.js';
import { validate } from "../middlewares/validate.middleware.js";
import { createExpenseSchema } from '../schemas/index.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();


router.get('/expenses', authenticate, getMyExpenses);
router.post('/expenses', authenticate, validate(createExpenseSchema), createExpense);
router.patch('/expenses/:id', authenticate, updateExpense);
router.delete('/expenses/:id', authenticate, deteleExpense);

export default router;