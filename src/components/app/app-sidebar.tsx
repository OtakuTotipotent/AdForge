import { appNavigation } from "@/config/navigation";
import { Logo } from "@/components/shared/logo";
import { NavLink } from "@/components/navigation/nav-link";

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r md:block">
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>

      <nav className="space-y-1 p-4">
        {appNavigation.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
