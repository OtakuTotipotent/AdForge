import { z } from "zod";

const uploadedImageSchema = z.object({
  publicId: z.string().min(1),
  secureUrl: z.string().url(),
});

export const generationSchema = z.object({
  projectName: z.string().min(3).max(100),

  productName: z.string().min(2).max(100),

  description: z.string().min(10).max(500),

  orientation: z.enum(["portrait", "landscape"]),

  productImage: uploadedImageSchema,

  modelImage: uploadedImageSchema.optional(),
});

export type GenerationInput = z.infer<typeof generationSchema>;
