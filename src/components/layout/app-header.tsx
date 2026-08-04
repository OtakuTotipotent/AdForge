import { Show } from "@clerk/nextjs";

import { CreditsBadge } from "./credits-badge";
import { Container } from "./container";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { UserNav } from "./user-nav";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />

          <DesktopNav />
        </div>

        <div className="flex items-center gap-4">
          <Show when="signed-in">
            <CreditsBadge />
          </Show>

          <UserNav />
        </div>
      </Container>
    </header>
  );
}
