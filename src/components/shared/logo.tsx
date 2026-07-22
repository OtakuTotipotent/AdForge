import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link href={ROUTES.HOME} className="text-2xl font-bold tracking-tight">
      {siteConfig.name}
    </Link>
  );
}
