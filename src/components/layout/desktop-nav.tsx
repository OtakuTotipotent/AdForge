"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  MARKETING_NAVIGATION,
  DASHBOARD_NAVIGATION,
} from "@/config/navigation";
import { cn } from "@/lib/utils";

const dashboardPrefixes = ["/generate", "/collections"];

export function DesktopNav() {
  const pathname = usePathname();

  const navigation = dashboardPrefixes.some((route) =>
    pathname.startsWith(route),
  )
    ? DASHBOARD_NAVIGATION
    : MARKETING_NAVIGATION;

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm transition-colors",
            pathname === item.href
              ? "font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
