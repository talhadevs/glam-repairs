"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type SensitivityChoice = "sensitive" | "non-sensitive";

const sensitivityOptions: {
  value: SensitivityChoice;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "sensitive",
    label: "Sensitive",
    description:
      "My skin often reacts badly. Redness, dryness and flakiness, itching and burning sensations",
    icon: "/svgs/Group 2085660888.svg",
  },
  {
    value: "non-sensitive",
    label: "Non-Sensitive",
    description:
      "My skin shows no reaction to certain ingredients or to changing skincare products",
    icon: "/svgs/Group 2085660887.svg",
  },
];

export default function SkinSensitivityStep() {
  const [selectedChoice, setSelectedChoice] = useStepAnswer<SensitivityChoice | null>(
    "booking.skinSensitivity",
    null,
  );
  useStepGate(selectedChoice !== null);

  return (
    <div>
      <StepHeader title="Do you feel your skin is sensitive?" />

      <StepBody>
        <StepChoiceList>
          {sensitivityOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="description"
              label={option.label}
              description={option.description}
              icon={option.icon}
              selected={selectedChoice === option.value}
              onSelect={() => setSelectedChoice(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
