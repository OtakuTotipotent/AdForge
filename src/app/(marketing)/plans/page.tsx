import Link from "next/link";
import type { Metadata } from "next";

import { PageContainer } from "@/components/common/page-container";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";
import { FREE_CREDITS, GENERATION_COST } from "@/constants/credits";
import { PLANS } from "@/constants/plans";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Plans",
  description:
    "Learn how AdForge AI credits work and what is currently available.",
};

export default function PlansPage() {
  const includedGenerations = FREE_CREDITS / GENERATION_COST;

  return (
    <PageContainer>
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Choose the plan that fits your workflow.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Advertisements use credits, so you can focus on the creative work.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Object.values(PLANS).map((plan) => {
          const isFree = plan === PLANS.FREE;

          return (
            <Card key={plan} className={isFree ? "border-foreground" : undefined}>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="capitalize">{plan.toLowerCase()}</CardTitle>
                  {isFree && <Badge variant="success">Available</Badge>}
                </div>
                <p className="pt-3 text-2xl font-semibold">
                  {isFree ? "Free" : "Not available yet"}
                </p>
              </CardHeader>
              <CardContent>
                {isFree ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      {FREE_CREDITS} starter credits included.
                    </p>
                    <Separator className="my-5" />
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li>{includedGenerations} advertisement generations</li>
                      <li>Portrait and landscape formats</li>
                      <li>Private generation collection</li>
                    </ul>
                    <Link
                      href={ROUTES.GENERATE}
                      className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
                    >
                      Start Creating
                    </Link>
                  </>
                ) : (
                  <p className="text-sm leading-6 text-muted-foreground">
                    Pricing, credits, and limits for this plan have not been configured yet.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold">How credits work</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          One advertisement generation costs {GENERATION_COST} credits. New users
          receive {FREE_CREDITS} free credits, which is enough for {includedGenerations}
          {" "}generations.
        </p>

        <div className="mt-8 space-y-6 rounded-xl border p-6">
          <div>
            <h3 className="font-semibold">What does a generation include?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              An AI-generated advertisement based on your product image, optional model image,
              description, and selected orientation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">What happens when credits run out?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You will not be able to start another generation. Additional credit or billing
              options are not configured in the current product.
            </p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
