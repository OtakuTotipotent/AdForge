import { GENERATION_COST } from "@/constants/credits";

export function hasEnoughCredits(credits: number) {
  return credits >= GENERATION_COST;
}

export function remainingCredits(credits: number) {
  return credits - GENERATION_COST;
}
