import { FEATURES } from "@/constants/features";

import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">Everything You Need</h2>

          <p className="text-muted-foreground mt-4">
            Powerful AI tools designed for modern marketing workflows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
