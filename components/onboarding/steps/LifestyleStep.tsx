"use client";

import { type ReactNode } from "react";
import {
  StepBody,
  StepChoiceList,
  StepFilledCheckboxCard,
  StepHeader,
  StepRadioChoiceCard,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type SleepOption = "under-5" | "5-6" | "7-8" | "over-8";
type WaterOption = "under-4" | "4-6" | "7-8" | "over-8";
type StressOption = "low" | "moderate" | "high" | "very-high";
type DietOption = "dairy" | "sugar-fried" | "tea-coffee" | "home-cooked" | "skip-meals";

const sleepOptions: { value: SleepOption; label: string }[] = [
  { value: "under-5", label: "Less than 5 hours" },
  { value: "5-6", label: "5–6 hours" },
  { value: "7-8", label: "7–8 hours" },
  { value: "over-8", label: "More than 8 hours" },
];

const waterOptions: { value: WaterOption; label: string }[] = [
  { value: "under-4", label: "Less than 4 glasses" },
  { value: "4-6", label: "4–6 glasses" },
  { value: "7-8", label: "7–8 glasses" },
  { value: "over-8", label: "More than 8 glasses" },
];

const stressOptions: { value: StressOption; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
  { value: "very-high", label: "Very high" },
];

const dietOptions: { value: DietOption; label: string }[] = [
  { value: "dairy", label: "I eat a lot of dairy" },
  { value: "sugar-fried", label: "I eat a lot of sugar / fried food" },
  { value: "tea-coffee", label: "I drink tea or coffee daily" },
  { value: "home-cooked", label: "I eat mostly home-cooked food" },
  { value: "skip-meals", label: "I skip meals regularly" },
];

const sectionLabelClassName =
  "text-sm font-medium text-brand-ink sm:text-[0.9375rem]";

function LifestyleSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className={sectionLabelClassName}>{title}</h2>
      <StepChoiceList spacing="compact" className="mt-3">
        {children}
      </StepChoiceList>
    </section>
  );
}

export default function LifestyleStep() {
  const [sleep, setSleep] = useStepAnswer<SleepOption | null>(
    "onboarding.sleep",
    null,
  );
  const [water, setWater] = useStepAnswer<WaterOption | null>(
    "onboarding.water",
    null,
  );
  const [stress, setStress] = useStepAnswer<StressOption | null>(
    "onboarding.stress",
    null,
  );
  const [diet, setDiet] = useStepAnswer<DietOption[]>("onboarding.diet", []);

  useStepGate(sleep !== null && water !== null && stress !== null);

  const toggleDiet = (value: DietOption) => {
    setDiet(
      diet.includes(value)
        ? diet.filter((item) => item !== value)
        : [...diet, value],
    );
  };

  return (
    <div>
      <StepHeader
        eyebrow="Lifestyle"
        title="Tell us a bit about your lifestyle — it affects your skin more than most people realize."
      />

      <StepBody className="space-y-6 sm:space-y-7">
        <LifestyleSection title="Sleep (per night on average):">
          {sleepOptions.map((option) => (
            <StepRadioChoiceCard
              key={option.value}
              label={option.label}
              selected={sleep === option.value}
              onSelect={() => setSleep(option.value)}
            />
          ))}
        </LifestyleSection>

        <LifestyleSection title="Water intake (per day):">
          {waterOptions.map((option) => (
            <StepRadioChoiceCard
              key={option.value}
              label={option.label}
              selected={water === option.value}
              onSelect={() => setWater(option.value)}
            />
          ))}
        </LifestyleSection>

        <LifestyleSection title="Stress level:">
          {stressOptions.map((option) => (
            <StepRadioChoiceCard
              key={option.value}
              label={option.label}
              selected={stress === option.value}
              onSelect={() => setStress(option.value)}
            />
          ))}
        </LifestyleSection>

        <LifestyleSection title="Diet (select all that apply):">
          {dietOptions.map((option) => (
            <StepFilledCheckboxCard
              key={option.value}
              label={option.label}
              selected={diet.includes(option.value)}
              onSelect={() => toggleDiet(option.value)}
            />
          ))}
        </LifestyleSection>
      </StepBody>
    </div>
  );
}
