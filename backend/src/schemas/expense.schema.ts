import { z } from "zod"

export const createExpenseSchema = z.object({
  description: z.string().min(4, "El nombre o descripción es demasiado corta"),
  amount: z.number().positive("Debe ser mayor que 0"),
  userId: z.number(),
  date: z.string().optional()
})