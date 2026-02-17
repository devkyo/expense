import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>, type: "body" | "query" | "params" = "body") =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (err: any) {
      res.status(400).json({ error: err.errors || err.message });
    }
  }