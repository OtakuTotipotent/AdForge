import type { IUser } from "@/features/user";
import { SubscriptionPlan, UserRole } from "@/features/user";

export function isAdmin(user: IUser) {
  return user.role === UserRole.ADMIN;
}

export function isUser(user: IUser) {
  return user.role === UserRole.USER;
}

export function hasSubscription(user: IUser, plan: SubscriptionPlan) {
  return user.subscription === plan;
}

export function isPremium(user: IUser) {
  return (
    user.subscription === SubscriptionPlan.PRO || user.subscription === SubscriptionPlan.PREMIUM
  );
}

export function hasCredits(user: IUser) {
  return user.credits > 0;
}

export function canGenerateAds(user: IUser) {
  return hasCredits(user);
}

export function canAccessPremiumModels(user: IUser) {
  return isPremium(user);
}

export function canManageUsers(user: IUser) {
  return isAdmin(user);
}
