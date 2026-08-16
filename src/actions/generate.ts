"use server";

import { auth } from "@clerk/nextjs/server";

import { GenerationService } from "@/services";
import { getCurrentDbUser } from "@/lib/auth/current-db-user";
import { deductCredits } from "@/lib/auth/credits";
import {
  generationSchema,
  type GenerationInput,
} from "@/validators/generation";

export async function generateAdvertisement(values: GenerationInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized.");
  }

  const parsed = generationSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Invalid input.");
  }

  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.credits <= 0) {
    throw new Error("No credits remaining.");
  }

  const result = await GenerationService.generate(parsed.data);

  await deductCredits(user.clerkId, 1);

  return result;
}
