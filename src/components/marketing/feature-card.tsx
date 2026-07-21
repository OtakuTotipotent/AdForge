import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="rounded-xl border p-6 transition-all hover:shadow-md">
      <div className="bg-primary/10 mb-4 inline-flex rounded-lg p-3">
        <Icon className="text-primary size-6" />
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
}
