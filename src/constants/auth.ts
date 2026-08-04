import { ROUTES } from "./routes";

export const AUTH_ROUTES = {
  AFTER_SIGN_IN: ROUTES.GENERATE,
  AFTER_SIGN_UP: ROUTES.GENERATE,
} as const;
