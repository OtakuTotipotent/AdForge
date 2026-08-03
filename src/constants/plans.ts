export const PLANS = {
  FREE: "FREE",

  PRO: "PRO",

  PREMIUM: "PREMIUM",

  ULTIMATE: "ULTIMATE",
} as const;

export type Plan = (typeof PLANS)[keyof typeof PLANS];
