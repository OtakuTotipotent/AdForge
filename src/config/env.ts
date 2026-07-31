import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),

    CLERK_SECRET_KEY: z.string().min(1),

    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),

    GEMINI_API_KEY: z.string().min(1),

    GROQ_API_KEY: z.string().min(1),

    OPENROUTER_API_KEY: z.string().min(1),

    GITHUB_MODELS_API_KEY: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.url(),

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

    GEMINI_API_KEY: process.env.GEMINI_API_KEY,

    GROQ_API_KEY: process.env.GROQ_API_KEY,

    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,

    GITHUB_MODELS_API_KEY: process.env.GITHUB_MODELS_API_KEY,

    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
