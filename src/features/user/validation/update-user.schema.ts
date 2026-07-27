import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.email().optional(),

  username: z.string().trim().min(3).max(50).optional(),

  imageUrl: z.url().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
