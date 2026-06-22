"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type ImproveGoal =
  | "ingredient-knowledge"
  | "skincare-consistency"
  | "skincare-health"
  | "self-care-routine"
  | "self-confidence"
  | "other";

type GoalOption = {
  value: ImproveGoal;
  label: string;
  icon?: string;
};

const goalOptions: GoalOption[] = [
  {
    value: "ingredient-knowledge",
    label: "Knowledge of skincare ingredients",
    icon: "/svgs/Group 2085660857.svg",
  },
  {
    value: "skincare-consistency",
    label: "Skincare consistency",
    icon: "/svgs/Group 2085660858.svg",
  },
  {
    value: "skincare-health",
    label: "Skincare health",
    icon: "/svgs/Group 2085660859.svg",
  },
  {
    value: "self-care-routine",
    label: "Self-care routine",
    icon: "/svgs/Group (17).svg",
  },
  {
    value: "self-confidence",
    label: "Self confidence",
    icon: "/svgs/Group (18).svg",
  },
  { value: "other", label: "Other" },
];

export default function GlamImproveGoalsStep() {
  const [selectedGoals, setSelectedGoals] = useState<ImproveGoal[]>([]);

  const toggleGoal = (value: ImproveGoal) => {
    setSelectedGoals((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div>
      <StepHeader
        title="I hope glam will help me improve my..."
        subtitle="Select all that apply"
      />

      <StepBody>
        <StepChoiceList spacing="compact">
          {goalOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="icon-multi"
              iconSize="goal"
              indicatorBorder="lavender"
              icon={option.icon}
              label={option.label}
              selected={selectedGoals.includes(option.value)}
              onSelect={() => toggleGoal(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
