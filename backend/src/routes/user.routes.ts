import { Router } from 'express';
import { createUser, getUsers, loginUser, getProfile } from '../controllers/user.controllers.js';
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, loginUserSchema } from '../schemas/index.js';
import { authenticate, type AuthRequest } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', validate(loginUserSchema), loginUser);
router.post('/users', authenticate, validate(createUserSchema), createUser);
router.get('/users', authenticate, getUsers);

router.get('/profile', authenticate, getProfile);

export default router;