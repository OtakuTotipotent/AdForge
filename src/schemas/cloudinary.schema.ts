import { z } from "zod";

export const cloudinarySignatureSchema = z.object({
  folder: z.string().min(1),
});

export type CloudinarySignatureInput = z.infer<
  typeof cloudinarySignatureSchema
>;
