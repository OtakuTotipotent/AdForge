import "server-only";

import { connectToDatabase } from "@/lib/db";
import { mapClerkUser } from "@/lib/auth/clerk-user.mapper";
import type { ClerkWebhookUser } from "@/types/clerk";
import { UserService } from "@/services";

export async function handleUserUpdated(payload: ClerkWebhookUser) {
  await connectToDatabase();

  const user = mapClerkUser(payload);

  await UserService.update(user.clerkId, user);
}
