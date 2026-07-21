import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function HeroActions() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      <Link href={ROUTES.GENERATE}>
        <Button size="lg">Start Creating</Button>
      </Link>

      <Link href={ROUTES.PRICING}>
        <Button variant="outline" size="lg">
          View Pricing
        </Button>
      </Link>
    </div>
  );
}
