"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type SocialMediaChoice = "yes" | "no";

const choiceOptions: { value: SocialMediaChoice; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export default function SocialMediaStep() {
  const [selectedChoice, setSelectedChoice] = useStepAnswer<SocialMediaChoice | null>(
    "booking.socialMedia",
    null,
  );
  useStepGate(selectedChoice !== null);

  return (
    <div>
      <StepHeader
        title="Did you hear about Glam repair from a social media?"
        subtitle="Almost 15% of our users come from their instagram"
      />

      <StepBody>
        <StepChoiceList>
          {choiceOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="text"
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
