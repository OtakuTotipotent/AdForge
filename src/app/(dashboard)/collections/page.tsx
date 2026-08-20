import Link from "next/link";

import { AdvertisementCard } from "@/components/cards/advertisement-card";
import { PageContainer } from "@/components/common/page-container";
import { Card, CardContent } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { getCurrentDbUser } from "@/lib/auth/current-db-user";
import { GenerationService } from "@/services";

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
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold">No advertisements yet.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Generated advertisements will appear here when they are ready.
            </p>
            <Link
              href={ROUTES.GENERATE}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
            >
              Create Advertisement
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {generations.map((generation) => (
            <AdvertisementCard
              key={generation._id.toString()}
              generationId={generation._id.toString()}
              projectName={generation.projectName}
              productName={generation.productName}
              imageUrl={generation.generatedImageUrl}
              orientation={generation.orientation}
              status={generation.status}
              visibility={generation.visibility}
              createdAt={generation.createdAt}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
