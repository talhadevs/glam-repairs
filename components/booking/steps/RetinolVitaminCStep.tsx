"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type RetinolVitaminCAwareness =
  | "yes-used"
  | "interested"
  | "heard-unsure";

const awarenessOptions: { value: RetinolVitaminCAwareness; label: string }[] =
  [
    { value: "yes-used", label: "Yes, I've used them" },
    { value: "interested", label: "No, but interested" },
    { value: "heard-unsure", label: "Heard, but unsure" },
  ];

export default function RetinolVitaminCStep() {
  const [selectedAwareness, setSelectedAwareness] =
    useStepAnswer<RetinolVitaminCAwareness | null>(
      "booking.retinolVitaminC",
      null,
    );
  useStepGate(selectedAwareness !== null);

  return (
    <div>
      <StepHeader title="Are you aware of the benefits of retinol and vitamin C for skin?" />

      <StepBody>
        <StepChoiceList>
          {awarenessOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="text"
              label={option.label}
              selected={selectedAwareness === option.value}
              onSelect={() => setSelectedAwareness(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
