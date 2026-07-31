"use client";

import { ThemeProvider } from "./theme-provider";
import { SonnerProvider } from "./sonner-provider";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}

      <SonnerProvider />
    </ThemeProvider>
  );
}
