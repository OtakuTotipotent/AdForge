import type { ReactNode } from "react";

import { AppFooter, AppHeader } from "@/components/layout";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </>
  );
}
