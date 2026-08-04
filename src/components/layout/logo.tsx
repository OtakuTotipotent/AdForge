import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export function Logo() {
  return (
    <Link href={ROUTES.HOME} className="text-xl font-bold tracking-tight">
      AdForge AI
    </Link>
  );
}
