import type { Request, Response, NextFunction } from 'express';
// import { AuthRequest } from "../types/jwt.js";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { userId: number, email: string }
}


export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido en el entorno");
    }

    const secret = process.env.JWT_SECRET;


    const authHeader = req.headers.authorization as string;
    if (!authHeader) res.status(401).json({ error: "Unauthorized" });

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: "Invalid credentials" });

    const token = parts[1];
    if (!token) return res.status(401).json({ error: "Invalid credentials" });
    const decoded = jwt.verify(token, secret);

    if (typeof decoded !== "object" || decoded === null || !('userId' in decoded) || !('email' in decoded)) {
      return res.status(401).json({ error: "Token inválido: payload no contiene el userId o email" });
    }

    req.user = {
      userId: Number((decoded as any).userId),
      email: String((decoded as any).email)
    };

    next();

  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: `Unauthorized: ${err.message}` });
  }
}