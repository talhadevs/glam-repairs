"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type AddExosomesChoice = "yes" | "not-now";

const choiceOptions: { value: AddExosomesChoice; label: string }[] = [
  { value: "yes", label: "Yes, include it" },
  { value: "not-now", label: "Not now" },
];

export default function AddExosomesStep() {
  const [selectedChoice, setSelectedChoice] = useState<AddExosomesChoice | null>(
    null,
  );

  return (
    <div>
      <StepHeader
        title="Add exosomes-powered care to your routine?"
        subtitle="Helps boost collagen & skin repair"
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
