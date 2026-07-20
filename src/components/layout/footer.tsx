import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} AdForge AI</p>

        <div className="flex gap-6">
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
