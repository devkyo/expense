
import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js'
import { hashPassword, comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPRIRES_IN || "1h";

interface jwtPayload {
  userId: number
  email: string
}

const payload: jwtPayload = {
  userId: 1,
  email: "test@asdsd.com"
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password)
      }
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return res.status(401).json({ message: `Usuario o contrase{a incorrectos.` });

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) return res.status(401).json({ message: `Usuario o contraseña incorrectos` });

    const payload = { userId: user.id, email: user.email };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

    res.status(200).json({
      message: 'Login success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token
      }
    });

  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ error: 'Error al buscar usuario' })
  }
}