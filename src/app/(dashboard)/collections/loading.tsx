import { PageContainer } from "@/components/common/page-container";
import { Card, CardContent } from "@/components/ui";

export default function CollectionsLoading() {
  return (
    <PageContainer>
      <h1 className="text-4xl font-bold">Collections</h1>
      <Card className="mt-8">
        <CardContent className="py-10 text-sm text-muted-foreground">
          Loading your advertisements...
        </CardContent>
      </Card>
    </PageContainer>
  );
}
