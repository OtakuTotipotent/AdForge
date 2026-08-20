import Image from "next/image";
import Link from "next/link";

import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ROUTES } from "@/constants/routes";

import { CollectionActions } from "./collection-actions";

interface AdvertisementCardProps {
  projectName: string;
  productName: string;
  imageUrl?: string | null;
  orientation: "portrait" | "landscape";
  createdAt?: Date;
  status?: "pending" | "processing" | "completed" | "failed";
  visibility?: "private" | "public";
  generationId?: string;
}

function statusVariant(status: NonNullable<AdvertisementCardProps["status"]>) {
  if (status === "completed") {
    return "success" as const;
  }

  if (status === "failed") {
    return "destructive" as const;
  }

  return "secondary" as const;
}

export function AdvertisementCard({
  projectName,
  productName,
  imageUrl,
  orientation,
  createdAt,
  status,
  visibility,
  generationId,
}: AdvertisementCardProps) {
  const imageClassName =
    orientation === "portrait"
      ? "aspect-9/16 w-full object-cover"
      : "aspect-video w-full object-cover";

  return (
    <Card className="overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${productName} advertisement`}
          width={1200}
          height={orientation === "portrait" ? 1600 : 675}
          className={imageClassName}
        />
      ) : (
        <div
          className={`flex items-center justify-center bg-muted px-6 text-center text-sm text-muted-foreground ${
            orientation === "portrait" ? "aspect-9/16" : "aspect-video"
          }`}
        >
          {status === "failed"
            ? "Generation failed."
            : status === "completed"
              ? "Generated image is unavailable."
              : "Advertisement is being generated."}
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{projectName}</CardTitle>
            <CardContent className="p-0 pt-1 text-sm text-muted-foreground">
              {productName}
            </CardContent>
          </div>
          {status && <Badge variant={statusVariant(status)}>{status}</Badge>}
        </div>
        <CardContent className="p-0 pt-1 text-sm text-muted-foreground">
          <span className="capitalize">{orientation}</span>
          {visibility && <span> · {visibility}</span>}
          {createdAt && (
            <span className="block pt-1 text-xs">
              {createdAt.toLocaleDateString()}
            </span>
          )}
        </CardContent>
      </CardHeader>

      {generationId && (
        <CardFooter className="justify-between gap-3">
          <Link
            href={`${ROUTES.COLLECTIONS}/${generationId}`}
            className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
          >
            View details
          </Link>
          <CollectionActions generationId={generationId} />
        </CardFooter>
      )}
    </Card>
  );
}
