"use client";

import Link from "next/link";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";
import {
  resolveBookingNextStep,
  resolveBookingPrevStep,
} from "@/lib/funnel/bookingFlow";

type OnboardingIntroNavProps = {
  backHref: string;
  nextHref: string;
  nextLabel?: string;
  /**
   * When false, the step has no required answer to gate on (e.g. informational
   * steps) and the Next button is always enabled. Defaults to true so every
   * input step is required before continuing.
   */
  gated?: boolean;
  /**
   * Current booking step number. When set, the nav applies conditional
   * branching (skip ranges) to the back/next targets based on stored answers.
   */
  bookingStep?: number;
};

export default function OnboardingIntroNav({
  backHref,
  nextHref,
  nextLabel = "Next",
  gated = true,
  bookingStep,
}: OnboardingIntroNavProps) {
  const currentStepValid = useFunnelStore((state) => state.currentStepValid);
  const answers = useFunnelStore((state) => state.answers);
  const canContinue = !gated || currentStepValid;

  let resolvedBackHref = backHref;
  let resolvedNextHref = nextHref;

  if (typeof bookingStep === "number") {
    const branchNext = resolveBookingNextStep(bookingStep, answers);
    if (branchNext !== null) {
      resolvedNextHref = `/booking/step/${branchNext}`;
    }

    const branchPrev = resolveBookingPrevStep(bookingStep, answers);
    if (branchPrev !== null) {
      resolvedBackHref = `/booking/step/${branchPrev}`;
    }
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href={resolvedBackHref}
        aria-label="Go back"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-border-light bg-white text-brand-gray shadow-sm transition-opacity hover:opacity-80"
      >
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {canContinue ? (
        <Link
          href={resolvedNextHref}
          className="subscribe-fill-btn rounded-full bg-brand-light px-10 py-3 text-xs font-normal uppercase tracking-[0.15em] text-white sm:px-12 sm:py-3.5 sm:text-sm"
        >
          {nextLabel}
        </Link>
      ) : (
        <button
          type="button"
          disabled
          aria-disabled
          className="cursor-not-allowed rounded-full bg-brand-light/40 px-10 py-3 text-xs font-normal uppercase tracking-[0.15em] text-white/80 sm:px-12 sm:py-3.5 sm:text-sm"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
