import "server-only";

import { connectToDatabase } from "@/lib/db";
import { mapClerkUser } from "@/lib/auth/clerk-user.mapper";
import type { ClerkWebhookUser } from "@/types/clerk";
import { UserService } from "@/services";
import { FREE_CREDITS } from "@/constants/credits";
import { PLANS } from "@/constants/plans";

export async function handleUserCreated(payload: ClerkWebhookUser) {
  await connectToDatabase();

  const user = mapClerkUser(payload);

  await UserService.upsert(user.clerkId, {
    ...user,
    credits: FREE_CREDITS,
    plan: PLANS.FREE,
  });
}
