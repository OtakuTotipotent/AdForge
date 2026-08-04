import type { PropsWithChildren } from "react";

import { Container } from "@/components/layout";

export function PageContainer({ children }: PropsWithChildren) {
  return <Container className="py-10">{children}</Container>;
}
