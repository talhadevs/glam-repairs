"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type WithGlamGoal =
  | "reduce-acne-redness"
  | "best-routine"
  | "learn-ingredients"
  | "save-money"
  | "prevent-aging"
  | "other";

type GoalOption = {
  value: WithGlamGoal;
  label: string;
  icon?: string;
};

const goalOptions: GoalOption[] = [
  {
    value: "reduce-acne-redness",
    label: "Reduce acne, redness, or sensitivity",
    icon: "/svgs/Sun_Allergy.svg",
  },
  {
    value: "best-routine",
    label: "Find the best skincare routine for my skin",
    icon: "/svgs/Group (25).svg",
  },
  {
    value: "learn-ingredients",
    label: "Learn skincare ingredients",
    icon: "/svgs/Group 2085660853.svg",
  },
  {
    value: "save-money",
    label: "Save money on skincare",
    icon: "/svgs/Group 2085660854.svg",
  },
  {
    value: "prevent-aging",
    label: "Prevent early signs of aging",
    icon: "/svgs/Group 2085660896.svg",
  },
  { value: "other", label: "Other" },
];

export default function WithGlamGoalsStep() {
  const [selectedGoals, setSelectedGoals] = useState<WithGlamGoal[]>([]);

  const toggleGoal = (value: WithGlamGoal) => {
    setSelectedGoals((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div>
      <StepHeader
        title="With glam, I&apos;d like to"
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
