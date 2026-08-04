import { z } from "zod";

export const generateSchema = z.object({
  projectName: z.string().trim().min(3).max(100),

  productName: z.string().trim().min(2).max(100),

  prompt: z.string().trim().max(3000),

  orientation: z.enum(["portrait", "landscape"]),
});

export type GenerateInput = z.infer<typeof generateSchema>;
