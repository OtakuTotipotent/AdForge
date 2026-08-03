import { Container } from "./container";

export function AppFooter() {
  return (
    <footer className="border-t py-8">
      <Container>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AdForge AI
        </p>
      </Container>
    </footer>
  );
}
