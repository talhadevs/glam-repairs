export const FUNNEL_PLAN_IDS = ["free", "clarity", "transform"] as const;

export type FunnelPlanId = (typeof FUNNEL_PLAN_IDS)[number];

export function isFunnelPlanId(value: unknown): value is FunnelPlanId {
  return (
    typeof value === "string" &&
    (FUNNEL_PLAN_IDS as readonly string[]).includes(value)
  );
}

/** Onboarding start URL with an optional preselected plan (skips plan step). */
export function getOnboardingStartHref(planId?: FunnelPlanId | null) {
  if (planId && isFunnelPlanId(planId)) {
    return `/onboarding/step/1?plan=${planId}`;
  }
  return "/onboarding/step/1";
}
