"use client";

import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type SkinTone =
  | "very-fair"
  | "fair"
  | "medium"
  | "tan"
  | "deep"
  | "light-rose"
  | "terracotta"
  | "caramel"
  | "sandy-beige"
  | "not-sure";

type SkinToneOption = {
  value: SkinTone;
  label: string;
  color?: string;
};

const skinToneOptions: SkinToneOption[] = [
  { value: "very-fair", label: "Very fair", color: "#F8DCC8" },
  { value: "fair", label: "Fair", color: "#E8B98A" },
  { value: "medium", label: "Medium", color: "#C68642" },
  { value: "tan", label: "Tan", color: "#8B5A2B" },
  { value: "deep", label: "Deep", color: "#4A2C17" },
];

const additionalSkinToneOptions: SkinToneOption[] = [
  { value: "light-rose", label: "Light rose", color: "#E8B4A8" },
  { value: "terracotta", label: "Terracotta", color: "#C9977A" },
  { value: "caramel", label: "Caramel", color: "#B8734A" },
  { value: "sandy-beige", label: "Sandy beige", color: "#D4C4A8" },
  { value: "not-sure", label: "Not sure" },
];

export default function SkinToneStep() {
  const [selectedTone, setSelectedTone] = useStepAnswer<SkinTone | null>(
    "booking.skinTone",
    null,
  );
  useStepGate(selectedTone !== null);
  const [showMore, setShowMore] = useState(false);

  const visibleOptions = showMore
    ? [...skinToneOptions, ...additionalSkinToneOptions]
    : skinToneOptions;

  return (
    <div>
      <StepHeader
        title="What is color closest to your skin tone?"
        subtitle="Get extra skin renewal and glow with this advanced serum"
      />

      <StepBody>
        <StepChoiceList>
          {visibleOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="color-swatch"
              label={option.label}
              color={option.color}
              selected={selectedTone === option.value}
              onSelect={() => setSelectedTone(option.value)}
            />
          ))}

          {!showMore ? (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="w-full pt-1 text-center text-sm font-medium text-brand-light transition-opacity hover:opacity-80 sm:text-[0.9375rem]"
            >
              Show more
            </button>
          ) : null}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
