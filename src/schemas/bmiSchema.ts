import { z } from "zod";

export const bmiSchema = z.object({
  weight: z.number().min(2, "Peso muito baixo").max(500, "Peso inválido"),
  height: z.number().min(0.5, "Altura muito baixa").max(3, "Altura inválida"),
});

export type BmiFormData = z.infer<typeof bmiSchema>;
