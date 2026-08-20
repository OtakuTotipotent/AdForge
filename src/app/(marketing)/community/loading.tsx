import { PageContainer } from "@/components/common/page-container";
import { Card } from "@/components/ui";

export default function CommunityLoading() {
  return (
    <PageContainer>
      <div className="max-w-2xl">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-10 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Card key={index} className="h-80 animate-pulse bg-muted" />
        ))}
      </div>
    </PageContainer>
  );
}
