"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BOOKING_REPORT_UNLOCK,
  ONBOARDING_COMPLETE_UNLOCK,
  fallbackStepPath,
} from "@/lib/funnel/funnelProgress";
import {
  type FunnelFlow,
  useFunnelStore,
} from "@/lib/funnel/useFunnelStore";

type FunnelStepGuardProps = {
  flow: FunnelFlow;
  /** Form step number, or report/complete unlock sentinel. */
  step: number;
};

/**
 * Blocks URL skip-ahead. Users can only open steps up to the farthest
 * unlocked step (advanced only by completing prior cards).
 */
export default function FunnelStepGuard({ flow, step }: FunnelStepGuardProps) {
  const router = useRouter();
  const unlockedStep = useFunnelStore((state) =>
    flow === "booking"
      ? state.bookingUnlockedStep
      : state.onboardingUnlockedStep,
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useFunnelStore.persist.hasHydrated()) {
      finish();
      return;
    }
    return useFunnelStore.persist.onFinishHydration(finish);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (step <= unlockedStep) return;

    if (flow === "booking" && step === BOOKING_REPORT_UNLOCK) {
      router.replace(fallbackStepPath("booking", unlockedStep));
      return;
    }
    if (flow === "onboarding" && step === ONBOARDING_COMPLETE_UNLOCK) {
      router.replace(fallbackStepPath("onboarding", unlockedStep));
      return;
    }

    router.replace(fallbackStepPath(flow, unlockedStep));
  }, [hydrated, flow, step, unlockedStep, router]);

  return null;
}
