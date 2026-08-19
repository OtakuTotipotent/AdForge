import "server-only";

import { GENERATION_COST } from "@/constants/credits";
import { UserModel } from "@/models";

export async function deductCredits(
  clerkId: string,
  amount: number,
): Promise<boolean> {
  const result = await UserModel.updateOne(
    {
      clerkId,
      credits: {
        $gte: amount,
      },
    },
    {
      $inc: {
        credits: -amount,
      },
    },
  );

  return result.modifiedCount === 1;
}

export async function addCredits(
  clerkId: string,
  amount: number,
): Promise<boolean> {
  const result = await UserModel.updateOne(
    {
      clerkId,
    },
    {
      $inc: {
        credits: amount,
      },
    },
  );

  return result.modifiedCount === 1;
}

export function hasEnoughCredits(credits: number): boolean {
  return credits >= GENERATION_COST;
}

export function remainingCredits(credits: number): number {
  return credits - GENERATION_COST;
}
