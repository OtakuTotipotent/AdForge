import { marketingNavigation } from "@/config/navigation";
import { Logo } from "@/components/shared/logo";
import { NavLink } from "@/components/navigation/nav-link";
import { AuthButtons } from "@/components/auth/auth-buttons";

export function Navbar() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* AdForge Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden gap-8 md:flex">
          {marketingNavigation.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Authentication */}
        <AuthButtons />
      </div>
    </header>
  );
}
