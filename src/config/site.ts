import { env } from "@/config/env";

export const siteConfig = {
  name: "AdForge AI",

  description:
    "Create AI-powered advertisements from product and model images.",

  url: env.NEXT_PUBLIC_APP_URL,

  ogImage: "/images/og-image.png",

  creator: "Afnan Muhammad",

  links: {
    github: "",
    linkedin: "",
  },
} as const;
