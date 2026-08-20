import Link from "next/link";

import { AdvertisementCard } from "@/components/cards/advertisement-card";
import { PageContainer } from "@/components/common/page-container";
import { Card, CardContent } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { GenerationService } from "@/services";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const generations = await GenerationService.findPublicGenerations();
  const publicGenerations = generations.filter(
    (generation): generation is typeof generation & { generatedImageUrl: string } =>
      typeof generation.generatedImageUrl === "string" &&
      generation.generatedImageUrl.length > 0,
  );

  return (
    <PageContainer>
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">Community</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          See what creators are making.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A gallery of completed advertisements that creators have chosen to share.
        </p>
      </header>

      {publicGenerations.length === 0 ? (
        <Card className="mt-10">
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold">No public advertisements yet.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Be the first creator to share an advertisement with the community.
            </p>
            <Link
              href={ROUTES.GENERATE}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
            >
              Create an Advertisement
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publicGenerations.map((generation) => (
            <AdvertisementCard
              key={generation._id.toString()}
              projectName={generation.projectName}
              productName={generation.productName}
              imageUrl={generation.generatedImageUrl}
              orientation={generation.orientation}
              createdAt={generation.createdAt}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
