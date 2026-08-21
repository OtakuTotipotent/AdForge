import { PageContainer } from "@/components/common/page-container";
import { Card } from "@/components/ui";

export default function ProfileLoading() {
  return (
    <PageContainer>
      <div className="h-10 w-36 animate-pulse rounded bg-muted" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card className="h-56 animate-pulse bg-muted" />
        <Card className="h-56 animate-pulse bg-muted" />
      </div>
    </PageContainer>
  );
}
