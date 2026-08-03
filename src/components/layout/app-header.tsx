import { Container } from "./container";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";

export function AppHeader() {
  return (
    <header className="border-b">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <DesktopNav />
      </Container>
    </header>
  );
}
