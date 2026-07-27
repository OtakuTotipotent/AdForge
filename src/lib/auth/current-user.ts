import { auth } from "@clerk/nextjs/server";

import { UserRepository } from "@/features/user";

export async function requireUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await UserRepository.findByClerkId(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return UserRepository.findByClerkId(userId);
}
