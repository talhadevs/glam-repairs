"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type AddPdrnChoice = "yes" | "maybe-later";

const choiceOptions: { value: AddPdrnChoice; label: string }[] = [
  { value: "yes", label: "Yes, add it!" },
  { value: "maybe-later", label: "Maybe later" },
];

export default function AddPdrnStep() {
  const [selectedChoice, setSelectedChoice] = useStepAnswer<AddPdrnChoice | null>(
    "booking.addPdrn",
    null,
  );
  useStepGate(selectedChoice !== null);

  return (
    <div>
      <StepHeader
        title="Want to add PDRN to your plan?"
        subtitle="Get extra skin renewal and glow with this advanced serum"
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
