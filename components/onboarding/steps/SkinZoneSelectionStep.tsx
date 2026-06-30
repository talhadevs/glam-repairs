"use client";

import {
  StepBody,
  StepChoiceList,
  StepFilledChoiceCard,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type SkinZone =
  | "whole-face"
  | "forehead"
  | "eyes"
  | "cheeks"
  | "nose-tzone"
  | "chin-jawline"
  | "neck";

const skinZoneOptions: { value: SkinZone; label: string }[] = [
  { value: "whole-face", label: "Whole face" },
  { value: "forehead", label: "Forehead" },
  { value: "eyes", label: "Eyes / under-eye area" },
  { value: "cheeks", label: "Cheeks" },
  { value: "nose-tzone", label: "Nose & T-zone" },
  { value: "chin-jawline", label: "Chin & jawline" },
  { value: "neck", label: "Neck" },
];

export default function SkinZoneSelectionStep() {
  const [selectedZones, setSelectedZones] = useStepAnswer<SkinZone[]>(
    "onboarding.skinZones",
    [],
  );
  useStepGate(selectedZones.length > 0);

  const toggleZone = (value: SkinZone) => {
    if (value === "whole-face") {
      setSelectedZones(selectedZones.includes("whole-face") ? [] : ["whole-face"]);
      return;
    }

    const withoutWholeFace = selectedZones.filter((item) => item !== "whole-face");

    if (withoutWholeFace.includes(value)) {
      setSelectedZones(withoutWholeFace.filter((item) => item !== value));
      return;
    }

    setSelectedZones([...withoutWholeFace, value]);
  };

  return (
    <div>
      <StepHeader
        eyebrow="Skin Zone Selection"
        title="What areas of your skin are you most concerned about?"
      />

      <StepBody>
        <StepChoiceList>
          {skinZoneOptions.map((option) => (
            <StepFilledChoiceCard
              key={option.value}
              label={option.label}
              selected={selectedZones.includes(option.value)}
              onSelect={() => toggleZone(option.value)}
            />
          ))}
        </StepChoiceList>

        <p className="mt-5 text-sm text-brand-gray sm:mt-6 sm:text-[0.9375rem]">
          Select all that apply.
        </p>
      </StepBody>
    </div>
  );
}
