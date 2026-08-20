"use server";

import { auth } from "@clerk/nextjs/server";

import { GENERATION_COST } from "@/constants/credits";
import {
  addCredits,
  deductCredits,
  hasEnoughCredits,
} from "@/lib/auth/credits";
import { getCurrentDbUser } from "@/lib/auth/current-db-user";
import { GenerationService } from "@/services";
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
    throw new Error("Invalid generation input.");
  }

  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("User not found.");
  }

  if (!hasEnoughCredits(user.credits)) {
    throw new Error("Insufficient credits.");
  }

  const creditsDeducted = await deductCredits(user.clerkId, GENERATION_COST);

  if (!creditsDeducted) {
    throw new Error("Insufficient credits.");
  }

  try {
    const generation = await GenerationService.create({
      userId: user._id,

      projectName: parsed.data.projectName,
      productName: parsed.data.productName,
      description: parsed.data.description,

      prompt: "",

      orientation: parsed.data.orientation,

      productImagePublicId: parsed.data.productImage.publicId,
      productImageUrl: parsed.data.productImage.secureUrl,

      modelImagePublicId: parsed.data.modelImage?.publicId ?? null,
      modelImageUrl: parsed.data.modelImage?.secureUrl ?? null,

      generatedImagePublicId: null,
      generatedImageUrl: null,

      generatedVideoPublicId: null,
      generatedVideoUrl: null,

      visibility: "private",
      status: "pending",

      errorMessage: null,
      downloads: 0,
    });

    const completed = await GenerationService.generate(generation._id.toString());

    return {
      id: completed._id.toString(),
      generatedImageUrl: completed.generatedImageUrl,
      status: completed.status,
    };
  } catch (error) {
    await addCredits(user.clerkId, GENERATION_COST);

    throw error;
  }
}
