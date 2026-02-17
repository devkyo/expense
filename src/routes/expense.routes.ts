import { Router } from 'express';
import { createExpense, getExpenses } from '../controllers/expense.controllers.js';
import { validate } from "../middlewares/validate.middleware.js";
import { createExpenseSchema } from '../schemas/index.js';

const router = Router();

router.post('/expenses', validate(createExpenseSchema), createExpense);
router.get('/expenses', getExpenses);

export default router;