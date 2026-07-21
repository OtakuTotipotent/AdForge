import { HeroActions } from "./hero-actions";
import { HeroBadge } from "./hero-badge";
import { TrustBar } from "./trust-bar";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto max-w-5xl text-center">
        <HeroBadge />

        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
          Create Professional AI Advertisements in Minutes
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          Upload your product. Add a prompt. Let AdForge AI generate high-quality marketing images
          and videos for your business.
        </p>

        <HeroActions />

        <TrustBar />
      </div>
    </section>
  );
}
