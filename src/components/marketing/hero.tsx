import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto max-w-4xl text-center">
        <span className="rounded-full border px-4 py-1 text-sm font-medium">
          AI-Powered Advertising Platform
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
          Create Professional AI Advertisements in Minutes
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          Upload your product. Add a prompt. Let AdForge AI generate high-quality marketing images
          and videos ready for social media, e-commerce, and advertising campaigns.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href={ROUTES.GENERATE}>
            <Button size="lg">Start Creating</Button>
          </Link>

          <Link href={ROUTES.PRICING}>
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
