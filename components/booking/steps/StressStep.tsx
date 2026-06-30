"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type StressChoice = "yes-every-day" | "often" | "rarely" | "never";

const stressOptions: { value: StressChoice; label: string }[] = [
  { value: "yes-every-day", label: "Yes, every day" },
  { value: "often", label: "Often" },
  { value: "rarely", label: "Rarely" },
  { value: "never", label: "Never" },
];

export default function StressStep() {
  const [selectedChoice, setSelectedChoice] = useStepAnswer<StressChoice | null>(
    "booking.stress",
    null,
  );
  useStepGate(selectedChoice !== null);

  return (
    <div>
      <StepHeader
        title="Do you often feel stressed and tense?"
        subtitle="Stress increases cortisol and adrenaline, causing inflammation and skin issues like acne, eczema, or psoriasis"
      />

      <StepBody>
        <StepChoiceList>
          {stressOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="text"
              labelStyle="snug"
              label={option.label}
              selected={selectedChoice === option.value}
              onSelect={() => setSelectedChoice(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
