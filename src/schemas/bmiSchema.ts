import { z } from "zod";

export const bmiSchema = z.object({
  weight: z.number({ message: "Peso é obrigatório" }).min(2, "Muito baixo"),

  height: z.number("Altura é obrigatória").min(0.5, "Muito baixa"),
});

export type BmiFormData = z.infer<typeof bmiSchema>;
