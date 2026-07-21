interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>

      <p className="text-muted-foreground mt-4 text-lg">{description}</p>
    </div>
  );
}
