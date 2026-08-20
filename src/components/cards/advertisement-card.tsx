import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface AdvertisementCardProps {
  projectName: string;
  productName: string;
  imageUrl: string;
  orientation: "portrait" | "landscape";
  createdAt?: Date;
}

export function AdvertisementCard({
  projectName,
  productName,
  imageUrl,
  orientation,
  createdAt,
}: AdvertisementCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={imageUrl}
        alt={`${productName} advertisement`}
        width={1200}
        height={orientation === "portrait" ? 1600 : 675}
        className={
          orientation === "portrait"
            ? "aspect-9/16 w-full object-cover"
            : "aspect-video w-full object-cover"
        }
      />

      <CardHeader>
        <CardTitle>{projectName}</CardTitle>
        <CardContent className="p-0 pt-1 text-sm text-muted-foreground">
          {productName}
          {createdAt && (
            <span className="block pt-1 text-xs">
              {createdAt.toLocaleDateString()}
            </span>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
