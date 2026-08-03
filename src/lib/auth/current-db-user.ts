import "server-only";

import { auth } from "@clerk/nextjs/server";

import { connectToDatabase } from "@/lib/db";
import { UserRepository } from "@/repositories";

export async function getCurrentDbUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  await connectToDatabase();

  return UserRepository.findByClerkId(userId);
}
