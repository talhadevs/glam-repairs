"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type KBeautyGlow = "glass" | "honey" | "cloud" | "dewy";

const glowOptions: {
  value: KBeautyGlow;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "glass",
    label: "Glass skin",
    description: "Clear, pore-less, ultra-dewy",
    icon: "/svgs/skin_6642743 1.svg",
  },
  {
    value: "honey",
    label: "Honey skin",
    description: "Plump and deeply moisturized",
    icon: "/svgs/Group (9).svg",
  },
  {
    value: "cloud",
    label: "Cloud skin",
    description: "Soft-matte, diffused glow",
    icon: "/svgs/beauty_8495773 1.svg",
  },
  {
    value: "dewy",
    label: "Dewy skin",
    description: "Fresh, hydrated glow",
    icon: "/svgs/cream_11061268 1.svg",
  },
];

export default function KBeautyGlowStep() {
  const [selectedGlow, setSelectedGlow] = useStepAnswer<KBeautyGlow | null>(
    "booking.kbeautyGlow",
    null,
  );
  useStepGate(selectedGlow !== null);

  return (
    <div>
      <StepHeader title="Which K-beauty glow inspires you most?" />

      <StepBody>
        <StepChoiceList>
          {glowOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="description"
              label={option.label}
              description={option.description}
              icon={option.icon}
              selected={selectedGlow === option.value}
              onSelect={() => setSelectedGlow(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
