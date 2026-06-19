"use client";

import Link from "next/link";
import { useState } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { ONBOARDING_PROGRESS } from "@/components/onboarding/onboardingConfig";

type PlanId = "clarity" | "transform";

const plans: {
  id: PlanId;
  name: string;
  price: string;
  highlights: string;
}[] = [
  {
    id: "clarity",
    name: "Clarity",
    price: "Rs. 1,500",
    highlights: "Manual expert review · Delivered in 48 hours · 1 follow-up at 2 weeks",
  },
  {
    id: "transform",
    name: "Transform",
    price: "Rs. 3,000",
    highlights:
      "Priority review in 24 hours · Week-by-week plan · 2 follow-ups · WhatsApp access",
  },
];

function PlanCard({
  name,
  price,
  highlights,
  selected,
  onSelect,
}: {
  name: string;
  price: string;
  highlights: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[1.25rem] border p-4 text-left shadow-sm transition-colors sm:p-5 ${
        selected
          ? "border-brand-light bg-brand-light text-white"
          : "border-brand-border-light/60 bg-white text-brand-ink hover:border-brand-lavender"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              selected
                ? "border-white bg-white"
                : "border-brand-border-light bg-white"
            }`}
          >
            {selected ? <span className="h-2.5 w-2.5 rounded-full bg-brand-light" /> : null}
          </span>
          <span className="text-base font-semibold sm:text-lg">{name}</span>
        </div>
        <span
          className={`font-serif text-xl leading-none sm:text-2xl ${
            selected ? "text-white" : "text-brand-light"
          }`}
        >
          {price}
        </span>
      </div>
      <p
        className={`mt-3 text-sm leading-relaxed sm:text-[0.9375rem] ${
          selected ? "text-white/90" : "text-brand-gray"
        }`}
      >
        {highlights}
      </p>
    </button>
  );
}

function PlanSelectionFooter({
  backHref,
  nextHref,
  canContinue,
}: {
  backHref: string;
  nextHref: string;
  canContinue: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href={backHref}
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
          href={nextHref}
          className="subscribe-fill-btn flex-1 rounded-full bg-brand-light px-6 py-3 text-center text-xs font-normal uppercase tracking-[0.15em] text-white sm:py-3.5 sm:text-sm"
        >
          Continue
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="flex-1 cursor-not-allowed rounded-full bg-brand-light/45 px-6 py-3 text-center text-xs font-normal uppercase tracking-[0.15em] text-white/80 sm:py-3.5 sm:text-sm"
        >
          Continue
        </button>
      )}
    </div>
  );
}

type PlanSelectionStepProps = {
  backHref?: string;
  nextHref?: string;
};

export default function PlanSelectionStep({
  backHref = "/onboarding/step/8",
  nextHref = "/onboarding/step/10",
}: PlanSelectionStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  return (
    <OnboardingShell
      currentStep={ONBOARDING_PROGRESS.planSelection}
      footer={
        <PlanSelectionFooter
          backHref={backHref}
          nextHref={nextHref}
          canContinue={selectedPlan !== null}
        />
      }
    >
      <div>
        <header>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
            Plan Selection &amp; Payment
          </p>
          <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
            Choose your plan
          </h1>
        </header>

        <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              name={plan.name}
              price={plan.price}
              highlights={plan.highlights}
              selected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-dashed border-brand-lavender bg-brand-purple-soft/30 px-4 py-8 text-center sm:mt-7 sm:px-5 sm:py-10">
          <p className="text-sm text-brand-gray sm:text-[0.9375rem]">
            Payment integration here
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}
