import { z } from "zod";

export const uploadedImageSchema = z.object({
  publicId: z.string().min(1),
  secureUrl: z.url(),
});

export const generationSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(100, "Project name is too long"),

  productName: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Product name is too long"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(2000, "Description is too long"),

  orientation: z.enum(["portrait", "landscape"]),

  productImage: uploadedImageSchema,

  modelImage: uploadedImageSchema.optional(),
});

export type GenerationInput = z.infer<typeof generationSchema>;
