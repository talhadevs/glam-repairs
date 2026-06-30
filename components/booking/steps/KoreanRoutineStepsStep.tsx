"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type RoutineLength = "minimal" | "balanced" | "full";

const routineLengthOptions: { value: RoutineLength; label: string }[] = [
  { value: "minimal", label: "Minimal (2-3 steps)" },
  { value: "balanced", label: "Balanced (4-5 steps)" },
  { value: "full", label: "Full Korean routine (7+ steps)" },
];

export default function KoreanRoutineStepsStep() {
  const [selectedLength, setSelectedLength] = useStepAnswer<RoutineLength | null>(
    "booking.koreanRoutineLength",
    null,
  );
  useStepGate(selectedLength !== null);

  return (
    <div>
      <StepHeader title="How many steps do you want in your Korean skincare routine?" />

      <StepBody>
        <StepChoiceList>
          {routineLengthOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="text"
              label={option.label}
              selected={selectedLength === option.value}
              onSelect={() => setSelectedLength(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
