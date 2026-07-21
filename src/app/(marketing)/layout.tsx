import { PageContainer } from "@/components/layout/page-container";
import { ReactNode } from "react";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <PageContainer>{children}</PageContainer>
    </>
  );
}
