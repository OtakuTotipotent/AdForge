import { ROUTES } from "@/constants/routes";

export const MARKETING_NAVIGATION = [
  {
    title: "Home",
    href: ROUTES.HOME,
  },
  {
    title: "Community",
    href: ROUTES.COMMUNITY,
  },
  {
    title: "Plans",
    href: ROUTES.PLANS,
  },
  {
    title: "About",
    href: ROUTES.ABOUT,
  },
] as const;

export const DASHBOARD_NAVIGATION = [
  {
    title: "Generate",
    href: ROUTES.GENERATE,
  },
  {
    title: "Collections",
    href: ROUTES.COLLECTIONS,
  },
] as const;

export const DASHBOARD_ROUTE_PREFIXES = [
  ROUTES.GENERATE,
  ROUTES.COLLECTIONS,
] as const;
