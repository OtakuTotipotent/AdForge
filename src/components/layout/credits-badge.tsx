import { Zap } from "lucide-react";

import { getCurrentDbUser } from "@/lib/auth/current-db-user";

export async function CreditsBadge() {
  const user = await getCurrentDbUser();

  return (
    <div className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm">
      <Zap className="size-4 text-yellow-500" />

      <span>{user?.credits ?? 0}</span>

      <span className="text-muted-foreground">Credits</span>
    </div>
  );
}
