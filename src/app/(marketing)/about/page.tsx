import Link from "next/link";
import type { Metadata } from "next";
import { Images, ScanSearch, Sparkles, WandSparkles } from "lucide-react";

import { PageContainer } from "@/components/common/page-container";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how AdForge AI turns product information and reference imagery into advertising concepts.",
};

export default function AboutPage() {
  const workflow = [
    {
      title: "Describe your product",
      description:
        "Start with a project name, product name, creative description, and preferred orientation.",
    },
    {
      title: "Add reference imagery",
      description:
        "Upload a product image and, when it fits the concept, an optional model image.",
    },
    {
      title: "Generate the advertisement",
      description:
        "AdForge AI uses the supplied details and imagery to create an advertisement image.",
    },
    {
      title: "Keep the result",
      description:
        "Review completed advertisements in your private collection and choose whether to share them publicly.",
    },
  ];

  const principles = [
    {
      icon: ScanSearch,
      title: "Product-first visuals",
      description:
        "The workflow begins with your product image and product details, keeping the creative direction grounded in what you provide.",
    },
    {
      icon: Sparkles,
      title: "AI-assisted, not abstract",
      description:
        "AI helps turn a product brief and reference imagery into an advertising concept without requiring a separate creative-production workflow.",
    },
    {
      icon: Images,
      title: "Assets you can revisit",
      description:
        "Completed advertisements are stored in your collection so the work remains available after generation.",
    },
  ];

  return (
    <PageContainer>
      <section className="mx-auto max-w-3xl py-10 text-center sm:py-16">
        <Badge variant="outline">About AdForge AI</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          A simpler path from product idea to advertising creative.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          AdForge AI is an advertisement-generation platform for turning product
          information and reference imagery into polished visual concepts.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={ROUTES.GENERATE}
            className="inline-flex h-11 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
          >
            Start Creating
          </Link>
          <Link
            href={ROUTES.COMMUNITY}
            className="inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium transition-colors hover:bg-accent"
          >
            Explore Community
          </Link>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">The problem</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Strong product visuals often require more time and tooling than a first idea allows.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Creating advertising imagery can mean coordinating photography, design effort,
            reference material, and specialized tools. AdForge AI makes it easier to begin
            with the product details and imagery you already have, then develop an
            advertisement concept from there.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">How AdForge works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            A focused workflow for creating advertisements.
          </h2>
        </div>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
          {workflow.map((step, index) => (
            <li key={step.title}>
              <Card className="h-full">
                <CardHeader>
                  <span className="text-sm font-medium text-muted-foreground">
                    0{index + 1}
                  </span>
                  <CardTitle className="pt-3">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {step.description}
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">Our approach</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Creative assistance that stays close to your input.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="size-5" />
                <CardTitle className="pt-4">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl py-20 text-center">
        <WandSparkles className="mx-auto size-6" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          Create the next version of your product story.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start with your product, define the direction, and let AdForge AI help
          turn it into an advertisement image.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={ROUTES.GENERATE}
            className="inline-flex h-11 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
          >
            Start Creating
          </Link>
          <Link
            href={ROUTES.COMMUNITY}
            className="inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium transition-colors hover:bg-accent"
          >
            Explore Community
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
