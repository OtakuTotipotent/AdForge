"use client";

import Link from "next/link";

import { MARKETING_NAVIGATION } from "@/config/navigation";

export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {MARKETING_NAVIGATION.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
