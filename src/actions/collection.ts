"use server";

import { revalidatePath } from "next/cache";

import { requireDbUser } from "@/lib/auth/require-db-user";
import { GenerationService } from "@/services";
import { ROUTES } from "@/constants/routes";

export async function deleteGeneration(generationId: string) {
  const user = await requireDbUser();
  const deleted = await GenerationService.deleteUserGeneration(
    generationId,
    user._id.toString(),
  );

  if (!deleted) {
    return {
      success: false,
      message: "Unable to delete this advertisement.",
    };
  }

  revalidatePath(ROUTES.COLLECTIONS);
  revalidatePath(`${ROUTES.COLLECTIONS}/${generationId}`);
  revalidatePath(ROUTES.COMMUNITY);

  return { success: true };
}
