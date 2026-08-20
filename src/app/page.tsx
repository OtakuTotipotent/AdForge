import Link from "next/link";
import {
  ArrowRight,
  ImagePlus,
  LayoutTemplate,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  const steps = [
    {
      icon: ImagePlus,
      title: "Upload",
      description: "Add your product image and an optional model image.",
    },
    {
      icon: LayoutTemplate,
      title: "Describe",
      description:
        "Set the project, product, creative direction, and orientation.",
    },
    {
      icon: WandSparkles,
      title: "Generate",
      description: "Create a finished advertisement and save it to your collection.",
    },
  ];

  return (
    <>
      <section className="border-b">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="size-4" />
            AI-powered advertising
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Create premium advertisements with AI.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Provide a product image, optional model image, and creative
            direction. AdForge AI turns them into polished ad creatives.
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
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">How it works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            From source image to ad creative in three steps.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: StepIcon, title, description }) => {
            return (
              <Card key={title}>
                <CardHeader>
                  <StepIcon className="size-5" />
                  <CardTitle className="pt-4">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight">Made for focused creative work.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "AI-generated advertisements from your product imagery",
              "Optional model imagery for people-focused campaigns",
              "Portrait and landscape creative formats",
              "Cloud-hosted images and a private personal collection",
            ].map((feature) => (
              <div key={feature} className="rounded-lg border bg-background p-5 text-sm">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-2xl border p-8 sm:p-12">
          <p className="text-sm font-medium text-muted-foreground">Community</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">See what creators are making.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Explore advertisements that creators have chosen to share publicly.
          </p>
          <Link href={ROUTES.COMMUNITY} className="mt-6 inline-flex text-sm font-medium underline underline-offset-4">
            Explore the community
          </Link>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to create your next advertisement?</h2>
          <Link href={ROUTES.GENERATE} className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-black px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black">
            Start Creating <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
