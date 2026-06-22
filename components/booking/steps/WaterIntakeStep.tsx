"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type WaterIntakeChoice =
  | "coffee-tea-only"
  | "two-glasses"
  | "two-to-six"
  | "more-than-six";

const waterIntakeOptions: { value: WaterIntakeChoice; label: string }[] = [
  { value: "coffee-tea-only", label: "I only have coffee or tea" },
  { value: "two-glasses", label: "About 2 glasses (16 oz.)" },
  { value: "two-to-six", label: "2 to 6 glasses (16 - 48 oz.)" },
  { value: "more-than-six", label: "More than 6 glasses" },
];

export default function WaterIntakeStep() {
  const [selectedChoice, setSelectedChoice] = useState<WaterIntakeChoice | null>(
    null,
  );

  return (
    <div>
      <StepHeader title="What is your daily water intake?" />

      <StepBody>
        <StepChoiceList>
          {waterIntakeOptions.map((option) => (
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
