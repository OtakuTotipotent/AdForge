import type { ReactNode } from "react";

import { auth } from "@clerk/nextjs/server";

import { AppHeader } from "@/components/layout";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await auth.protect();

  return (
    <>
      <AppHeader />

      <main>{children}</main>
    </>
  );
}
