"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type JourneyFeelGoal =
  | "better-choices"
  | "relaxed-stress-free"
  | "control-skincare"
  | "confident-in-skin"
  | "radiant-glowing"
  | "other";

type GoalOption = {
  value: JourneyFeelGoal;
  label: string;
  icon?: string;
};

const goalOptions: GoalOption[] = [
  {
    value: "better-choices",
    label: "Better skincare choices",
    icon: "/svgs/Layer_x0020_1.svg",
  },
  {
    value: "relaxed-stress-free",
    label: "Relaxed and stress-free",
    icon: "/svgs/Group 2085660855.svg",
  },
  {
    value: "control-skincare",
    label: "Control my skincare",
    icon: "/svgs/Group (24).svg",
  },
  {
    value: "confident-in-skin",
    label: "Confident in my skin",
    icon: "/svgs/Group (23).svg",
  },
  {
    value: "radiant-glowing",
    label: "Radiant and glowing",
    icon: "/svgs/Group (22).svg",
  },
  { value: "other", label: "Other" },
];

export default function SkincareJourneyFeelStep() {
  const [selectedGoals, setSelectedGoals] = useState<JourneyFeelGoal[]>([]);

  const toggleGoal = (value: JourneyFeelGoal) => {
    setSelectedGoals((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div>
      <StepHeader
        title="During my glam skincare journey, i want to feel..."
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
