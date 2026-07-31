import { env } from "@/config/env";

export const siteConfig = {
  name: "AdForge AI",

  description:
    "Generate AI-powered advertisements, marketing videos, and promotional images.",

  url: env.NEXT_PUBLIC_APP_URL,

  ogImage: "/images/og-image.png",

  creator: "Afnan Muhammad",

  links: {
    github: "",
    linkedin: "",
  },
} as const;
