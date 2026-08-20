import { PageContainer } from "@/components/common/page-container";
import { Card } from "@/components/ui";

export default function CollectionsLoading() {
  return (
    <PageContainer>
      <div className="h-10 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Card key={index} className="h-80 animate-pulse bg-muted" />
        ))}
      </div>
    </PageContainer>
  );
}
