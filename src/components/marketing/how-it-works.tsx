import { HOW_IT_WORKS } from "@/content/marketing/how-it-works";
import { SectionHeader } from "@/components/shared/section-header";

export function HowItWorks() {
  return (
    <section className="py-24">
      <SectionHeader
        title="How AdForge Works"
        description="Create professional AI advertisements in three simple steps."
      />

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {HOW_IT_WORKS.map((item) => (
          <div key={item.step} className="rounded-xl border p-8">
            <span className="text-primary/20 text-5xl font-bold">{item.step}</span>

            <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>

            <p className="text-muted-foreground mt-3">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
