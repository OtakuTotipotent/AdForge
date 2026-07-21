import { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <PageContainer>{children}</PageContainer>
    </>
  );
}
