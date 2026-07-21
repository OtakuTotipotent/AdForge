import { MobileNav } from "@/components/navigation/mobile-nav";
import { UserNav } from "./user-nav";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <MobileNav />

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <UserNav />
    </header>
  );
}
