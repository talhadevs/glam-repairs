"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type SulfatesChoice = "yes" | "no" | "not-sure";

const sulfatesOptions: { value: SulfatesChoice; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
];

export default function SulfatesStep() {
  const [selectedChoice, setSelectedChoice] = useState<SulfatesChoice | null>(
    null,
  );

  return (
    <div>
      <StepHeader title="Have you used skincare products that contain sulfates?" />

      <StepBody>
        <StepChoiceList>
          {sulfatesOptions.map((option) => (
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
