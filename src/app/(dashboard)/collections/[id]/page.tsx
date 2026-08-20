import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CollectionActions } from "@/components/cards/collection-actions";
import { PageContainer } from "@/components/common/page-container";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { getCurrentDbUser } from "@/lib/auth/current-db-user";
import { GenerationService } from "@/services";

interface CollectionDetailPageProps {
  params: Promise<{ id: string }>;
}

function statusVariant(status: string) {
  if (status === "completed") {
    return "success" as const;
  }

  if (status === "failed") {
    return "destructive" as const;
  }

  return "secondary" as const;
}

export default async function CollectionDetailPage({
  params,
}: CollectionDetailPageProps) {
  const { id } = await params;
  const user = await getCurrentDbUser();

  if (!user) {
    notFound();
  }

  const generation = await GenerationService.findUserGeneration(
    id,
    user._id.toString(),
  );

  if (!generation) {
    notFound();
  }

  return (
    <PageContainer>
      <Link
        href={ROUTES.COLLECTIONS}
        className="inline-flex text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        Back to Collections
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card className="overflow-hidden">
          {generation.generatedImageUrl ? (
            <Image
              src={generation.generatedImageUrl}
              alt={`${generation.productName} advertisement`}
              width={1600}
              height={generation.orientation === "portrait" ? 2800 : 900}
              className={
                generation.orientation === "portrait"
                  ? "mx-auto max-h-[75vh] w-auto max-w-full object-contain"
                  : "w-full object-cover"
              }
            />
          ) : (
            <div className="flex min-h-80 items-center justify-center bg-muted px-6 text-center text-sm text-muted-foreground">
              {generation.status === "failed"
                ? "Generation failed."
                : generation.status === "completed"
                  ? "Generated image is unavailable."
                  : "Advertisement is being generated."}
            </div>
          )}
        </Card>

        <aside className="space-y-6">
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">Generation</p>
              <Badge variant={statusVariant(generation.status)}>
                {generation.status}
              </Badge>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {generation.projectName}
            </h1>
            <p className="mt-2 text-muted-foreground">{generation.productName}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Orientation</p>
                <p className="mt-1 capitalize">{generation.orientation}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Visibility</p>
                <p className="mt-1 capitalize">{generation.visibility}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="mt-1">{generation.createdAt.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Description</p>
                <p className="mt-1 leading-6">{generation.description}</p>
              </div>
            </CardContent>
          </Card>

          <CollectionActions generationId={id} redirectToCollections />
        </aside>
      </div>
    </PageContainer>
  );
}
