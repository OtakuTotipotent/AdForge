import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";

import { PLANS } from "@/data/plans";
import { ROUTES } from "@/constants/routes";

export function PricingPreview() {
  return (
    <section className="py-24">
      <SectionHeader
        title="Simple Pricing"
        description="Choose the plan that fits your content creation needs."
      />

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border p-8 ${plan.featured ? "border-primary shadow-lg" : ""}`}
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <p className="mt-4 text-4xl font-bold">{plan.price}</p>

            <p className="text-muted-foreground mt-2">{plan.credits} Credits</p>

            <p className="text-muted-foreground">{plan.duration}</p>

            <Button className="mt-8 w-full" variant={plan.featured ? "default" : "outline"}>
              Choose Plan
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href={ROUTES.PRICING}>
          <Button variant="link">View all pricing details</Button>
        </Link>
      </div>
    </section>
  );
}
