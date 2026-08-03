import "server-only";

import { connectToDatabase } from "@/lib/db";
import type { ClerkDeletedUser } from "@/types/clerk";
import { UserService } from "@/services";

export async function handleUserDeleted(payload: ClerkDeletedUser) {
  await connectToDatabase();

  await UserService.delete(payload.id);
}
