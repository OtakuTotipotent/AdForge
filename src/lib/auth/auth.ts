import "server-only";

import { auth } from "@clerk/nextjs/server";

export async function getAuth() {
  return auth();
}
