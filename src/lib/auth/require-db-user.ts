import "server-only";

import { getCurrentDbUser } from "./current-db-user";

export async function requireDbUser() {
  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
