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

export const dashboardNavigation = [
  {
    title: "Generate",
    href: ROUTES.GENERATE,
    icon: "sparkles",
  },
  {
    title: "Collections",
    href: ROUTES.COLLECTIONS,
    icon: "images",
  },
  {
    title: "Community",
    href: ROUTES.COMMUNITY,
    icon: "users",
  },
] as const;

export const dashboardSecondaryNavigation = [
  {
    title: "Pricing",
    href: ROUTES.PRICING,
    icon: "credit-card",
  },
  {
    title: "Settings",
    href: ROUTES.SETTINGS,
    icon: "settings",
  },
] as const;
