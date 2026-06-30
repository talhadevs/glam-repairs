"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type AntioxidantsUsage = "yes-used" | "willing-to-try" | "unsure";

const antioxidantsOptions: { value: AntioxidantsUsage; label: string }[] = [
  { value: "yes-used", label: "Yes, I've used them" },
  { value: "willing-to-try", label: "No, but willing to try" },
  { value: "unsure", label: "Unsure if used them" },
];

export default function AntioxidantsStep() {
  const [selectedUsage, setSelectedUsage] = useStepAnswer<AntioxidantsUsage | null>(
    "booking.antioxidants",
    null,
  );
  useStepGate(selectedUsage !== null);

  return (
    <div>
      <StepHeader title="Have you tried skincare products with antioxidants?" />

      <StepBody>
        <StepChoiceList>
          {antioxidantsOptions.map((option) => (
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
