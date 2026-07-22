import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>

        <div className="flex gap-6">
          <Link href={ROUTES.ABOUT}>About</Link>
          <Link href={ROUTES.PRICING}>Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
