"use client";

import {
  StepBody,
  StepChoiceList,
  StepFilledChoiceCard,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

const inputClassName =
  "w-full rounded-2xl border border-brand-border-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[15px]";

type PrimaryConcern =
  | "acne-breakouts"
  | "dark-spots"
  | "dryness"
  | "oiliness"
  | "uneven-tone"
  | "acne-scars"
  | "sensitivity"
  | "fine-lines"
  | "other";

const primaryConcernOptions: {
  value: PrimaryConcern;
  label: string;
  icon?: string;
}[] = [
  {
    value: "acne-breakouts",
    label: "Acne & breakouts",
    icon: "/svgs/Group 2085660911.svg",
  },
  {
    value: "dark-spots",
    label: "Dark spots & pigmentation",
    icon: "/svgs/Group 2085660913.svg",
  },
  {
    value: "dryness",
    label: "Dryness & flakiness",
    icon: "/svgs/skin_concern.svg",
  },
  {
    value: "oiliness",
    label: "Oiliness & large pores",
    icon: "/svgs/Group 2085660914.svg",
  },
  {
    value: "uneven-tone",
    label: "Uneven skin tone",
    icon: "/svgs/Group 2085660783.svg",
  },
  {
    value: "acne-scars",
    label: "Acne scars & marks",
    icon: "/svgs/Vector (5).svg",
  },
  {
    value: "sensitivity",
    label: "Sensitivity & redness",
    icon: "/svgs/Group 2085660912.svg",
  },
  {
    value: "fine-lines",
    label: "Fine lines & dullness",
    icon: "/svgs/Group (3).svg",
  },
  {
    value: "other",
    label: "Other (describe below)",
  },
];

export default function PrimaryConcernStep() {
  const [selectedConcern, setSelectedConcern] = useStepAnswer<PrimaryConcern | null>(
    "onboarding.primaryConcern",
    null,
  );
  const [otherDescription, setOtherDescription] = useStepAnswer<string>(
    "onboarding.primaryConcernOther",
    "",
  );
  useStepGate(
    selectedConcern !== null &&
      (selectedConcern !== "other" || otherDescription.trim().length > 0),
  );

  return (
    <div>
      <StepHeader
        eyebrow="Primary Concern"
        title="What is your main skin concern right now?"
      />

      <StepBody>
        <StepChoiceList>
          {primaryConcernOptions.map((option) => (
            <StepFilledChoiceCard
              key={option.value}
              label={option.label}
              icon={option.icon}
              reserveIconSpace={!option.icon}
              selected={selectedConcern === option.value}
              onSelect={() => setSelectedConcern(option.value)}
            />
          ))}
        </StepChoiceList>

        {selectedConcern === "other" ? (
          <div className="mt-4 sm:mt-5">
            <label htmlFor="other-concern" className="sr-only">
              Describe your concern
            </label>
            <textarea
              id="other-concern"
              name="otherConcern"
              rows={3}
              placeholder="Describe your main skin concern"
              value={otherDescription}
              onChange={(event) => setOtherDescription(event.target.value)}
              className={`${inputClassName} resize-none`}
            />
          </div>
        ) : null}

        <p className="mt-5 text-sm leading-relaxed text-brand-gray sm:mt-6 sm:text-[0.9375rem]">
          Select your top concern. You can describe secondary concerns in a later step.
        </p>
      </StepBody>
    </div>
  );
}
