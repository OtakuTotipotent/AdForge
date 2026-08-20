import { PageContainer } from "@/components/common/page-container";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getCurrentDbUser } from "@/lib/auth/current-db-user";
import { GenerationService } from "@/services";

function statusVariant(status: string) {
  if (status === "completed") {
    return "success" as const;
  }

  if (status === "failed") {
    return "destructive" as const;
  }

  return "secondary" as const;
}

export default async function CollectionsPage() {
  const user = await getCurrentDbUser();

  if (!user) {
    return null;
  }

  const generations = await GenerationService.findUserGenerations(
    user._id.toString(),
  );

  return (
    <PageContainer>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Collections</h1>
        <p className="text-muted-foreground">
          Your private generated advertisements.
        </p>
      </div>

      {generations.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Your generated advertisements will appear here.
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {generations.map((generation) => (
            <Card key={generation._id.toString()} className="overflow-hidden">
              {generation.generatedImageUrl ? (
                <Image
                  src={generation.generatedImageUrl}
                  alt={`${generation.productName} advertisement`}
                  width={800}
                  height={800}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-muted px-6 text-center text-sm text-muted-foreground">
                  {generation.status === "failed"
                    ? generation.errorMessage ?? "Generation failed."
                    : "Advertisement is being generated."}
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{generation.projectName}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {generation.productName}
                    </p>
                  </div>
                  <Badge variant={statusVariant(generation.status)}>
                    {generation.status}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
import Image from "next/image";
