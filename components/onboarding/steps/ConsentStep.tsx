"use client";

import Link from "next/link";
import { createContext, useContext } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { ONBOARDING_PROGRESS } from "@/components/onboarding/onboardingConfig";
import { StepHeader } from "@/components/steps";
import { useStepAnswer } from "@/lib/funnel/useStepAnswer";

type ConsentContextValue = {
  privateReview: boolean;
  marketingConsent: boolean;
  setPrivateReview: (value: boolean) => void;
  setMarketingConsent: (value: boolean) => void;
  canSubmit: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within ConsentStep");
  }
  return context;
}

function ConsentCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3.5 transition-colors sm:gap-3.5 sm:px-5 sm:py-4 ${
        checked
          ? "border-brand-light bg-brand-light text-white"
          : "border-brand-border-light/60 bg-white text-brand-ink hover:border-brand-lavender"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
          checked
            ? "border-white bg-white text-brand-light"
            : "border-brand-light bg-white text-transparent"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 10 8"
          className="h-2 w-2.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4.2L3.5 6.7L9 1.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm leading-relaxed sm:text-[0.9375rem]">{label}</span>
    </label>
  );
}

function ConsentFooter({ backHref, nextHref }: { backHref: string; nextHref: string }) {
  const { canSubmit } = useConsent();

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

      {canSubmit ? (
        <Link
          href={nextHref}
          className="subscribe-fill-btn flex-1 rounded-full bg-brand-light px-6 py-3 text-center text-xs font-normal tracking-[0.08em] text-white sm:py-3.5 sm:text-sm"
        >
          Agree &amp; Submit
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="flex-1 cursor-not-allowed rounded-full bg-brand-light/45 px-6 py-3 text-center text-xs font-normal tracking-[0.08em] text-white/80 sm:py-3.5 sm:text-sm"
        >
          Agree &amp; Submit
        </button>
      )}
    </div>
  );
}

function ConsentContent() {
  const {
    privateReview,
    marketingConsent,
    setPrivateReview,
    setMarketingConsent,
  } = useConsent();

  return (
    <div>
      <StepHeader
        title="Consent and trust"
        subtitle="Your privacy matters. You're in control of your photos and data."
        subtitleClassName="mt-2 text-sm leading-relaxed text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]"
      />

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        <ConsentCheckbox
          checked={privateReview}
          onChange={setPrivateReview}
          label="I understand that my photos and information will be reviewed privately by our certified aesthetics expert."
        />
        <ConsentCheckbox
          checked={marketingConsent}
          onChange={setMarketingConsent}
          label="I agree that my photos will not be used for marketing or shared publicly without my separate written consent."
        />
      </div>
    </div>
  );
}

type ConsentStepProps = {
  backHref?: string;
  nextHref?: string;
};

export default function ConsentStep({
  backHref = "/onboarding/step/9",
  nextHref = "/onboarding/complete",
}: ConsentStepProps) {
  const [privateReview, setPrivateReview] = useStepAnswer<boolean>(
    "onboarding.consentPrivateReview",
    false,
  );
  const [marketingConsent, setMarketingConsent] = useStepAnswer<boolean>(
    "onboarding.consentMarketing",
    false,
  );
  const canSubmit = privateReview && marketingConsent;

  return (
    <ConsentContext.Provider
      value={{
        privateReview,
        marketingConsent,
        setPrivateReview,
        setMarketingConsent,
        canSubmit,
      }}
    >
      <OnboardingShell
        currentStep={ONBOARDING_PROGRESS.consent}
        footer={<ConsentFooter backHref={backHref} nextHref={nextHref} />}
      >
        <ConsentContent />
      </OnboardingShell>
    </ConsentContext.Provider>
  );
}
