"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type RoutineTimeChoice = "ten-minutes" | "twenty-minutes" | "one-hour" | "even-more";

const routineTimeOptions: { value: RoutineTimeChoice; label: string }[] = [
  { value: "ten-minutes", label: "10 minutes" },
  { value: "twenty-minutes", label: "20 minutes" },
  { value: "one-hour", label: "1 hour" },
  { value: "even-more", label: "Even more" },
];

export default function SkincareRoutineTimeStep() {
  const [selectedChoice, setSelectedChoice] = useState<RoutineTimeChoice | null>(
    null,
  );

  return (
    <div>
      <StepHeader title="How much time do you spend on your daily skin care routine?" />

      <StepBody>
        <StepChoiceList>
          {routineTimeOptions.map((option) => (
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
