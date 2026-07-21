import { ROUTES } from "@/constants/routes";

export const marketingNavigation = [
  {
    title: "Home",
    href: ROUTES.HOME,
  },
  {
    title: "Community",
    href: ROUTES.COMMUNITY,
  },
  {
    title: "Pricing",
    href: ROUTES.PRICING,
  },
  {
    title: "About",
    href: ROUTES.ABOUT,
  },
] as const;

export const appNavigation = [
  {
    title: "Generate",
    href: ROUTES.GENERATE,
  },
  {
    title: "Collections",
    href: ROUTES.COLLECTIONS,
  },
  {
    title: "Community",
    href: ROUTES.COMMUNITY,
  },
  {
    title: "Pricing",
    href: ROUTES.PRICING,
  },
] as const;
