export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="text-muted-foreground mx-auto max-w-7xl px-6 text-center text-sm">
        © {new Date().getFullYear()} AdForge AI. All rights reserved.
      </div>
    </footer>
  );
}
