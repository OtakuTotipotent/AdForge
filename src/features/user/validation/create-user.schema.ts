import { z } from "zod";

export const createUserSchema = z.object({
  clerkId: z.string().min(1),

  email: z.email(),

  username: z.string().trim().min(3).max(50),

  imageUrl: z.url(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
