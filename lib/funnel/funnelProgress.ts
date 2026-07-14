import {
  BOOKING_TOTAL_STEPS,
} from "@/components/booking/bookingConfig";
import { ONBOARDING_FORM_STEPS } from "@/components/onboarding/onboardingConfig";
import type { FunnelFlow } from "@/lib/funnel/useFunnelStore";

/** Beyond last form step — unlocks `/booking/report`. */
export const BOOKING_REPORT_UNLOCK = BOOKING_TOTAL_STEPS + 1;

/** Beyond last form step — unlocks `/onboarding/complete`. */
export const ONBOARDING_COMPLETE_UNLOCK = ONBOARDING_FORM_STEPS + 1;

export function parseBookingProgressFromHref(href: string): number | null {
  if (href.startsWith("/booking/report")) return BOOKING_REPORT_UNLOCK;
  const match = href.match(/^\/booking\/step\/(\d+)/);
  if (!match) return null;
  const step = Number(match[1]);
  return Number.isInteger(step) ? step : null;
}

export function parseOnboardingProgressFromHref(href: string): number | null {
  if (href.startsWith("/onboarding/complete")) return ONBOARDING_COMPLETE_UNLOCK;
  const match = href.match(/^\/onboarding\/step\/(\d+)/);
  if (!match) return null;
  const step = Number(match[1]);
  return Number.isInteger(step) ? step : null;
}

export function resolveUnlockTarget(
  flow: FunnelFlow,
  href: string,
): number | null {
  return flow === "booking"
    ? parseBookingProgressFromHref(href)
    : parseOnboardingProgressFromHref(href);
}

export function fallbackStepPath(flow: FunnelFlow, unlockedStep: number) {
  if (flow === "booking") {
    const step = Math.min(Math.max(unlockedStep, 1), BOOKING_TOTAL_STEPS);
    return `/booking/step/${step}`;
  }
  const step = Math.min(Math.max(unlockedStep, 1), ONBOARDING_FORM_STEPS);
  return `/onboarding/step/${step}`;
}
