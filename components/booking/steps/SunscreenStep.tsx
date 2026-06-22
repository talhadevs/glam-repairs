"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type SunscreenChoice = "always" | "sometimes" | "rarely" | "never";

const sunscreenOptions: { value: SunscreenChoice; label: string }[] = [
  { value: "always", label: "Always" },
  { value: "sometimes", label: "Sometimes" },
  { value: "rarely", label: "Rarely" },
  { value: "never", label: "Never" },
];

export default function SunscreenStep() {
  const [selectedChoice, setSelectedChoice] = useState<SunscreenChoice | null>(
    null,
  );

  return (
    <div>
      <StepHeader title="Do you wear sunscreen outdoors?" />

      <StepBody>
        <StepChoiceList>
          {sunscreenOptions.map((option) => (
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
