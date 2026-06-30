"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type FeelGreatGoal =
  | "makeup-free"
  | "best-at-events"
  | "great-pics"
  | "inspire-loved-ones"
  | "social-media-glow"
  | "other";

type GoalOption = {
  value: FeelGreatGoal;
  label: string;
  icon?: string;
};

const goalOptions: GoalOption[] = [
  {
    value: "makeup-free",
    label: "Confidently makeup-free",
    icon: "/svgs/Group (19).svg",
  },
  {
    value: "best-at-events",
    label: "Feel my best at events",
    icon: "/svgs/Group (20).svg",
  },
  {
    value: "great-pics",
    label: "Take great pics",
    icon: "/svgs/Group (21).svg",
  },
  {
    value: "inspire-loved-ones",
    label: "Inspire the ones i love",
    icon: "/svgs/Group 2085660856.svg",
  },
  {
    value: "social-media-glow",
    label: "Glow on social media",
    icon: "/svgs/Mask group.svg",
  },
  { value: "other", label: "Other" },
];

export default function FeelGreatSkinGoalsStep() {
  const [selectedGoals, setSelectedGoals] = useStepAnswer<FeelGreatGoal[]>(
    "booking.feelGreatGoals",
    [],
  );
  useStepGate(selectedGoals.length > 0);

  const toggleGoal = (value: FeelGreatGoal) => {
    setSelectedGoals(
      selectedGoals.includes(value)
        ? selectedGoals.filter((item) => item !== value)
        : [...selectedGoals, value],
    );
  };

  return (
    <div>
      <StepHeader
        title="When i feel great about my skin, I'd like to"
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
