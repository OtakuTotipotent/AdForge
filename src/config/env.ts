import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Environment
    NODE_ENV: z.enum(["development", "test", "production"]),

    // Database
    MONGODB_URI: z.string().min(1),

    // Authentication
    CLERK_SECRET_KEY: z.string().min(1),

    // Storage
    CLOUDINARY_API_KEY: z.string().min(1),

    CLOUDINARY_API_SECRET: z.string().min(1),

    CLOUDINARY_CLOUD_NAME: z.string().min(1),

    // AI
    GEMINI_API_KEY: z.string().min(1),

    GITHUB_MODELS_API_KEY: z.string().min(1),

    GROQ_API_KEY: z.string().min(1),

    OPENROUTER_API_KEY: z.string().min(1),

    // Payments
    STRIPE_SECRET_KEY: z.string().min(1),

    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },

  client: {
    // Website Address
    NEXT_PUBLIC_APP_URL: z.url(),

    // Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },

  runtimeEnv: {
    // Environment
    NODE_ENV: process.env.NODE_ENV,

    // URL Address
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    // Authentication
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,

    // Database
    MONGODB_URI: process.env.MONGODB_URI,

    // Storage
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,

    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

    // AI
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,

    GITHUB_MODELS_API_KEY: process.env.GITHUB_MODELS_API_KEY,

    GROQ_API_KEY: process.env.GROQ_API_KEY,

    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,

    // Payments
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
});
