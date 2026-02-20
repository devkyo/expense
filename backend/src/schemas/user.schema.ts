import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(2, "El nombre es demasiado corto"),
  lastName: z.string().optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña demasiado corta")
})


export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})


export const userIdParamSchema = z.object({
  id: z.string().uuid("ID inválido")
})