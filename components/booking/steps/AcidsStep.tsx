"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type AcidsUsage = "yes-used" | "open-to-it" | "unsure" | "dont-want";

const acidsOptions: { value: AcidsUsage; label: string }[] = [
  { value: "yes-used", label: "Yes, I've used them" },
  { value: "open-to-it", label: "No, but open to it" },
  { value: "unsure", label: "Unsure if used them" },
  { value: "dont-want", label: "I don't want to use acids" },
];

export default function AcidsStep() {
  const [selectedUsage, setSelectedUsage] = useState<AcidsUsage | null>(null);

  return (
    <div>
      <StepHeader title="Have you used skincare products with acids?" />

      <StepBody>
        <StepChoiceList>
          {acidsOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="text"
              label={option.label}
              selected={selectedUsage === option.value}
              onSelect={() => setSelectedUsage(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
