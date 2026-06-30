"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type MoisturizedChoice = "yes" | "sometimes-tight" | "no" | "dont-know";

type MoisturizedOption = {
  value: MoisturizedChoice;
  label: string;
  icon?: string;
};

const moisturizedOptions: MoisturizedOption[] = [
  { value: "yes", label: "Yes", icon: "/svgs/Group 2085660881.svg" },
  {
    value: "sometimes-tight",
    label: "Sometimes feel tightness",
    icon: "/svgs/Group 2085660882.svg",
  },
  {
    value: "no",
    label: "No, can't live without moisturizer",
    icon: "/svgs/Group 2085660883.svg",
  },
  { value: "dont-know", label: "I don't know" },
];

export default function MoisturizedStep() {
  const [selectedChoice, setSelectedChoice] = useStepAnswer<MoisturizedChoice | null>(
    "booking.moisturized",
    null,
  );
  useStepGate(selectedChoice !== null);

  return (
    <div>
      <StepHeader title="Do you think your skin is well moisturized?" />

      <StepBody>
        <StepChoiceList>
          {moisturizedOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="icon"
              iconSize="medium"
              labelStyle="snug"
              icon={option.icon}
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
