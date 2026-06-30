"use client";

import Link from "next/link";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { ONBOARDING_PROGRESS } from "@/components/onboarding/onboardingConfig";
import { StepHeader } from "@/components/steps";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";
import { buildWhatsAppOrderLink } from "@/lib/funnel/whatsapp";

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
  const selectedPlan = useFunnelStore(
    (state) => state.selectedPlan,
  ) as PlanId | null;
  const setSelectedPlan = useFunnelStore((state) => state.setSelectedPlan);
  const fullName = useFunnelStore((state) => state.fullName);
  const email = useFunnelStore((state) => state.email);
  const sessionId = useFunnelStore((state) => state.sessionId);

  const activePlan = plans.find((plan) => plan.id === selectedPlan) ?? null;
  const whatsAppLink = activePlan
    ? buildWhatsAppOrderLink({
        planName: activePlan.name,
        price: activePlan.price,
        fullName,
        email,
        sessionId,
      })
    : null;

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
        <StepHeader
          eyebrow="Plan Selection & Payment"
          title="Choose your plan"
        />

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

        <div className="mt-6 rounded-[1.25rem] border border-brand-lavender bg-brand-purple-soft/30 px-4 py-5 text-center sm:mt-7 sm:px-5 sm:py-6">
          {activePlan && whatsAppLink ? (
            <>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 sm:py-4"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.95-.27-.1-.46-.15-.65.15-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5h-.56c-.2 0-.5.07-.77.37-.27.3-1.02 1-1.02 2.42 0 1.43 1.04 2.8 1.19 3 .15.2 2.05 3.12 4.95 4.38.69.3 1.23.48 1.65.6.7.22 1.33.2 1.83.12.56-.08 1.74-.71 1.98-1.4.25-.68.25-1.27.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.45 9.9-9.9C21.94 6.45 17.5 2 12.04 2z" />
                </svg>
                Pay on WhatsApp
              </a>
              <p className="mt-3 text-[0.6875rem] leading-relaxed text-brand-gray sm:text-xs">
                You&apos;ll be redirected to WhatsApp to complete payment for the{" "}
                {activePlan.name} plan ({activePlan.price}).
              </p>
            </>
          ) : (
            <p className="text-sm text-brand-gray sm:text-[0.9375rem]">
              Select a plan above to continue to payment.
            </p>
          )}
        </div>
      </div>
    </OnboardingShell>
  );
}
