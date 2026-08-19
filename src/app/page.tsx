import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="size-4" />
            AI-powered advertising
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Create premium advertisements with AI.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Turn your product images and ideas into polished advertising
            creatives with AdForge AI.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={ROUTES.GENERATE}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-black px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
            >
              Start Creating
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href={ROUTES.COMMUNITY}
              className="inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium transition-colors hover:bg-accent"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
