import Link from "next/link";

import { appNavigation } from "@/config/navigation";
import { Logo } from "@/components/shared/logo";

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r md:block">
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>

      <nav className="space-y-1 p-4">
        {appNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:bg-muted block rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
