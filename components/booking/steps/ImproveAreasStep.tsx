"use client";

import Image from "next/image";
import { useState } from "react";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";

type ImproveArea =
  | "whole-face"
  | "eyes"
  | "cheeks"
  | "under-nose"
  | "chin";

const areaOptions: {
  value: ImproveArea;
  label: string;
  icon: string;
}[] = [
  {
    value: "whole-face",
    label: "whole face",
    icon: "/svgs/Group 2085660829.svg",
  },
  {
    value: "eyes",
    label: "Eyes",
    icon: "/svgs/Vector (10).svg",
  },
  {
    value: "cheeks",
    label: "Cheeks",
    icon: "/svgs/Group (5).svg",
  },
  {
    value: "under-nose",
    label: "Under nose",
    icon: "/svgs/Group 2085660827.svg",
  },
  {
    value: "chin",
    label: "Chin",
    icon: "/svgs/Group 2085660901.svg",
  },
];

export default function ImproveAreasStep() {
  const [selectedArea, setSelectedArea] = useState<ImproveArea>("whole-face");

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

          <StepChoiceList
            spacing="compact"
            className="relative flex flex-col justify-center"
          >
            {areaOptions.map((option) => (
              <StepChoiceCard
                key={option.value}
                variant="compact-icon"
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
