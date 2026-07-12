import { env } from "@/config/env";

export const siteConfig = {
  name: "AdForge AI",

  description: "...",

  url: env.NEXT_PUBLIC_APP_URL,

  ogImage: "/og-image.png",

  links: {
    github: "...",
    x: "...",
    docs: "...",
  },
} as const;
