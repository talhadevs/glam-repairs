"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type SleepChoice = "minimal" | "some" | "long-well" | "like-to-sleep";

const sleepOptions: { value: SleepChoice; label: string }[] = [
  { value: "minimal", label: "Minimal rest (less than 5 hours)" },
  { value: "some", label: "I get some shut-eye (5-6 hours)" },
  { value: "long-well", label: "I sleep long and well (7-8 hours)" },
  { value: "like-to-sleep", label: "I like to sleep (8+ hours)" },
];

export default function SleepStep() {
  const [selectedChoice, setSelectedChoice] = useState<SleepChoice | null>(null);

  return (
    <div>
      <StepHeader title="How much sleep do you usually get?" />

      <StepBody>
        <StepChoiceList>
          {sleepOptions.map((option) => (
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
