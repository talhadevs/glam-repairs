"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type RoutineFrequency =
  | "morning-and-evening"
  | "morning-only"
  | "evening-only"
  | "none";

type RoutineOption = {
  value: RoutineFrequency;
  label: string;
  icon?: string;
};

const routineOptions: RoutineOption[] = [
  {
    value: "morning-and-evening",
    label: "Yes, i have a morning and an evening routine",
    icon: "/svgs/Group (8).svg",
  },
  {
    value: "morning-only",
    label: "Only a morning one",
    icon: "/svgs/afternoon_11930102 2.svg",
  },
  {
    value: "evening-only",
    label: "Only an evening one",
    icon: "/svgs/moon_7105089 1.svg",
  },
  {
    value: "none",
    label: "No, i don't have any routine",
  },
];

export default function DailyRoutineStep() {
  const [selectedRoutine, setSelectedRoutine] = useStepAnswer<RoutineFrequency | null>(
    "booking.dailyRoutine",
    null,
  );
  useStepGate(selectedRoutine !== null);

  return (
    <div>
      <StepHeader title="Do you have daily skin care routine?" />

      <StepBody>
        <StepChoiceList>
          {routineOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="icon"
              iconSize="medium"
              labelStyle="snug"
              icon={option.icon}
              label={option.label}
              selected={selectedRoutine === option.value}
              onSelect={() => setSelectedRoutine(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
