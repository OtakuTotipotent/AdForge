"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DASHBOARD_NAVIGATION,
  DASHBOARD_ROUTE_PREFIXES,
  MARKETING_NAVIGATION,
} from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const navigation = DASHBOARD_ROUTE_PREFIXES.some((route) =>
    pathname.startsWith(route),
  )
    ? DASHBOARD_NAVIGATION
    : MARKETING_NAVIGATION;

  return (
    <nav
      aria-label="Primary navigation"
      className="flex gap-1 overflow-x-auto py-2 scrollbar-none"
    >
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
          className={cn(
            "shrink-0 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
            pathname === item.href
              ? "bg-accent font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
