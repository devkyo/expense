import { Router } from 'express';

import userRoutes from './user.routes.js';
import expenseRoutes from './expense.routes.js';

const router = Router();

router.use('/', userRoutes);
router.use('/', expenseRoutes);
export default router;