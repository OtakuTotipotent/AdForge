import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={ROUTES.HOME} className="text-2xl font-bold tracking-tight">
      AdForge AI
    </Link>
  );
}
