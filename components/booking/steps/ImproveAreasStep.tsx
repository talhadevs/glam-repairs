"use client";

import Image from "next/image";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
  StepRequiredError,
} from "@/components/steps";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";
import { useStepGate, useStepRequiredError } from "@/lib/funnel/useStepAnswer";

type ImproveArea =
  | "whole-face"
  | "forehead"
  | "eyes"
  | "cheeks"
  | "nose-tzone"
  | "chin-jawline"
  | "neck";

const MAX_SELECTIONS = 2;
const ANSWER_KEY = "booking.improveArea";

const areaOptions: {
  value: ImproveArea;
  label: string;
  icon: string;
}[] = [
  {
    value: "whole-face",
    label: "whole face",
    icon: "/svgs/Group 2085660902.svg",
  },
  {
    value: "forehead",
    label: "Forehead",
    icon: "/svgs/Group (10).svg",
  },
  {
    value: "eyes",
    label: "Eyes / under-eye",
    icon: "/svgs/Vector (10).svg",
  },
  {
    value: "cheeks",
    label: "Cheeks",
    icon: "/svgs/Group (5).svg",
  },
  {
    value: "nose-tzone",
    label: "Nose & T-zone",
    icon: "/svgs/Group 2085660901.svg",
  },
  {
    value: "chin-jawline",
    label: "Chin & jawline",
    icon: "/svgs/Group 2085660827.svg",
  },
  {
    value: "neck",
    label: "Neck",
    icon: "/svgs/Group 2085660950.svg",
  },
];

function normalizeAreas(value: unknown): ImproveArea[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is ImproveArea => typeof item === "string");
  }
  if (typeof value === "string" && value.length > 0) {
    return [value as ImproveArea];
  }
  return [];
}

export default function ImproveAreasStep() {
  const rawAnswer = useFunnelStore((state) => state.answers[ANSWER_KEY]);
  const setAnswer = useFunnelStore((state) => state.setAnswer);
  const selectedAreas = normalizeAreas(rawAnswer);

  useStepGate(selectedAreas.length > 0 && selectedAreas.length < 3);
  const error = useStepRequiredError(
    selectedAreas.length === 0,
    "Please select at least 1 area.",
  );

  const setSelectedAreas = (next: ImproveArea[]) => {
    setAnswer(ANSWER_KEY, next);
  };

  const toggleArea = (value: ImproveArea) => {
    if (value === "whole-face") {
      setSelectedAreas(selectedAreas.includes("whole-face") ? [] : ["whole-face"]);
      return;
    }

    const withoutWholeFace = selectedAreas.filter((item) => item !== "whole-face");

    if (withoutWholeFace.includes(value)) {
      setSelectedAreas(withoutWholeFace.filter((item) => item !== value));
      return;
    }

    if (withoutWholeFace.length >= MAX_SELECTIONS) return;

    setSelectedAreas([...withoutWholeFace, value]);
  };

  return (
    <div>
      <StepHeader
        title="What areas would you like to improve?"
        titleSize="sm"
      />

      <StepBody spacing="sm">
        <div className="relative grid grid-cols-[0.85fr_1.15fr] items-stretch gap-3 sm:gap-4">
          <div className="relative w-full overflow-hidden rounded-2xl">
            <Image
              src="/svgs/women.svg"
              alt="Face analysis preview"
              width={234}
              height={635}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 640px) 38vw, 160px"
            />
          </div>

          <div className="relative flex flex-col justify-center">
            <StepChoiceList className="space-y-2 sm:space-y-2.5">
              {areaOptions.map((option) => (
                <StepChoiceCard
                  key={option.value}
                  variant="icon-multi"
                  iconSize="product"
                  indicatorBorder="lavender"
                  icon={option.icon}
                  label={option.label}
                  selected={selectedAreas.includes(option.value)}
                  onSelect={() => toggleArea(option.value)}
                />
              ))}
            </StepChoiceList>
            <StepRequiredError message={error} />
          </div>
        </div>
      </StepBody>
    </div>
  );
}
