import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../controllers/user.controllers.js';
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, loginUserSchema } from '../schemas/index.js';

const router = Router();

router.post('/login', validate(loginUserSchema), loginUser);
router.post('/users', validate(createUserSchema), createUser);
router.get('/users', getUsers);

export default router;