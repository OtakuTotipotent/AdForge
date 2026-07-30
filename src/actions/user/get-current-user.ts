"use server";

import { getCurrentUser } from "@/lib/auth";

export async function getCurrentUserAction() {
  return getCurrentUser();
}
