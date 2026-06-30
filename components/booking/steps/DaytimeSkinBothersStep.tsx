"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type DaytimeBother = "dull-skin" | "tiny-wrinkles" | "tightness" | "none";

type BotherOption = {
  value: DaytimeBother;
  label: string;
  icon?: string;
};

const botherOptions: BotherOption[] = [
  {
    value: "dull-skin",
    label: "Dull skin",
    icon: "/svgs/Group 2085660912.svg",
  },
  {
    value: "tiny-wrinkles",
    label: "Tiny wrinkles",
    icon: "/svgs/Group 2085660914.svg",
  },
  {
    value: "tightness",
    label: "Tightness",
    icon: "/svgs/Group 2085660882.svg",
  },
  { value: "none", label: "None of that" },
];

export default function DaytimeSkinBothersStep() {
  const [selectedBothers, setSelectedBothers] = useStepAnswer<DaytimeBother[]>(
    "booking.daytimeBothers",
    [],
  );
  useStepGate(selectedBothers.length > 0);

  const toggleBother = (value: DaytimeBother) => {
    if (value === "none") {
      setSelectedBothers(selectedBothers.includes("none") ? [] : ["none"]);
      return;
    }

    const withoutNone = selectedBothers.filter((item) => item !== "none");

    if (withoutNone.includes(value)) {
      setSelectedBothers(withoutNone.filter((item) => item !== value));
      return;
    }

    setSelectedBothers([...withoutNone, value]);
  };

  return (
    <div>
      <StepHeader title="What bothers your skin during the day?" />

      <StepBody>
        <StepChoiceList spacing="compact">
          {botherOptions.map((option) => {
            const selected = selectedBothers.includes(option.value);

            return (
              <StepChoiceCard
                key={option.value}
                variant="icon-multi"
                iconSize="goal"
                indicatorBorder="lavender"
                icon={option.icon}
                label={option.label}
                selected={selected}
                onSelect={() => toggleBother(option.value)}
                className={
                  selected
                    ? "shadow-none"
                    : "border-transparent shadow-[0_4px_24px_rgba(189,168,212,0.45)] hover:border-brand-lavender/60"
                }
              />
            );
          })}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
