"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { ONBOARDING_TOTAL_STEPS } from "@/components/onboarding/onboardingConfig";
import { getOnboardingFirstName } from "@/components/onboarding/onboardingStorage";
import { StepHeader } from "@/components/steps";

const nextSteps = [
  "Our certified expert reviews your photos and intake form",
  "Your personalized skin report is prepared",
  "You receive your report + routine within your plan's timeframe",
  "Your follow-up check-in is scheduled automatically",
] as const;

function SuccessIcon() {
  return (
    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-brand-success text-brand-success sm:h-[4.5rem] sm:w-[4.5rem]">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12.5L10 16.5L18 7.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type ThankYouStepProps = {
  currentStep?: number;
};

export default function ThankYouStep({
  currentStep = ONBOARDING_TOTAL_STEPS,
}: ThankYouStepProps) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    setFirstName(getOnboardingFirstName());
  }, []);

  const headline = firstName ? `Thank you, ${firstName}!` : "Thank you!";

  return (
    <OnboardingShell
      currentStep={currentStep}
      progressCompleted
      footer={
        <Link
          href="/"
          className="subscribe-fill-btn block w-full rounded-full bg-brand-light px-6 py-3 text-center text-xs font-normal tracking-[0.08em] text-white sm:py-3.5 sm:text-sm"
        >
          Back to Home →
        </Link>
      }
    >
      <div className="text-center">
        <SuccessIcon />

        <StepHeader
          title={headline}
          subtitle="Your submission has been received."
          titleClassName="mt-5 font-serif text-[1.75rem] leading-tight text-brand-ink sm:mt-6 sm:text-[2rem]"
          subtitleClassName="mt-2 text-sm text-brand-ink sm:text-[0.9375rem]"
        />

        <p className="mx-auto mt-5 max-w-[20rem] text-sm leading-relaxed text-brand-gray sm:mt-6 sm:max-w-none sm:text-[0.9375rem]">
          Our certified expert will review your skin assessment and deliver your
          personalized report within 24 or 48 hours — depending on your plan.
        </p>
        <p className="mx-auto mt-3 max-w-[20rem] text-sm leading-relaxed text-brand-gray sm:max-w-none sm:text-[0.9375rem]">
          We&apos;ll reach out via the contact details you provided. Keep an eye
          on your WhatsApp or email.
        </p>

        <div className="mt-6 text-left sm:mt-7">
          <h2 className="text-center text-sm font-semibold text-brand-ink sm:text-[0.9375rem]">
            What happens next:
          </h2>
          <ul className="mt-4 space-y-3">
            {nextSteps.map((step) => (
              <li
                key={step}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-gray sm:text-[0.9375rem]"
              >
                <span className="mt-0.5 shrink-0 text-brand-light">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </OnboardingShell>
  );
}
