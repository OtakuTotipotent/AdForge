import "server-only";

import { UserModel } from "@/models";

export async function deductCredits(clerkId: string, amount: number) {
  await UserModel.updateOne(
    {
      clerkId,
    },
    {
      $inc: {
        credits: -amount,
      },
    },
  );
}

export async function addCredits(clerkId: string, amount: number) {
  await UserModel.updateOne(
    {
      clerkId,
    },
    {
      $inc: {
        credits: amount,
      },
    },
  );
}
