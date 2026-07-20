import Link from "next/link";

import { marketingNavigation } from "@/config/navigation";
import { Logo } from "@/components/shared/logo";

export function Navbar() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <div className="flex items-center gap-8">
          {marketingNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
