"use client";

import Image from "next/image";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type ImproveArea =
  | "whole-face"
  | "forehead"
  | "eyes"
  | "cheeks"
  | "nose-tzone"
  | "chin-jawline"
  | "neck";

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

export default function ImproveAreasStep() {
  const [selectedArea, setSelectedArea] = useStepAnswer<ImproveArea | null>(
    "booking.improveArea",
    null,
  );
  useStepGate(selectedArea !== null);

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

          <StepChoiceList className="relative flex flex-col justify-center space-y-2 sm:space-y-2.5">
            {areaOptions.map((option) => (
              <StepChoiceCard
                key={option.value}
                variant="icon-multi"
                iconSize="product"
                indicatorBorder="lavender"
                icon={option.icon}
                label={option.label}
                selected={selectedArea === option.value}
                onSelect={() => setSelectedArea(option.value)}
              />
            ))}
          </StepChoiceList>
        </div>
      </StepBody>
    </div>
  );
}
