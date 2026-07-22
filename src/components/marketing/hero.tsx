import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto max-w-5xl text-center">
        <div className="bg-muted/40 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
          🚀 AI-powered advertising for modern creators
        </div>

        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
          Create Professional AI Advertisements in Minutes
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href={ROUTES.GENERATE}>
            <Button size="lg">Start Creating</Button>
          </Link>

          <Link href={ROUTES.PRICING}>
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>

        <div className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
          <span>✓ Image Generation</span>
          <span>✓ Video Generation</span>
          <span>✓ Secure Storage</span>
          <span>✓ Credit-Based Usage</span>
        </div>

        <div className="mt-12 flex justify-center">
          <p className="text-muted-foreground text-sm">
            Trusted by creators, startups, and growing businesses.
          </p>
        </div>
      </div>
    </section>
  );
}
