"use client";

import Image from "next/image";

import ConcernPill from "@/components/home/ConcernPill";
import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type KBeautyChoice = "yes" | "not-now";

const faceImage = "/images,svgs/Rectangle 3467689.jpg";

const pillProps = {
  paddingClassName: "py-0.5 pl-1 pr-2 sm:py-1 sm:pl-1.5 sm:pr-2.5",
  iconWrapSizeClassName: "h-6 w-6 sm:h-7 sm:w-7",
  iconImageClassName: "h-3 w-3 sm:h-3.5 sm:w-3.5",
  labelClassName:
    "shrink-0 whitespace-nowrap pl-1.5 text-[11px] font-normal uppercase tracking-wide text-brand-primary sm:pl-2 sm:text-[12px]",
} as const;

const choiceOptions: { value: KBeautyChoice; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "not-now", label: "Not now" },
];

export default function KBeautyRoutineStep() {
  const [selectedChoice, setSelectedChoice] = useStepAnswer<KBeautyChoice | null>(
    "booking.kbeautyRoutine",
    null,
  );
  useStepGate(selectedChoice !== null);

  return (
    <div>
      <StepHeader title="Should Glam add Korean Skincare (K-Beauty) routine to your plan?" />

      <div className="relative mx-auto mt-6 w-[10.5rem] overflow-visible sm:mt-7 sm:w-[11.5rem]">
        <div className="relative aspect-square w-full overflow-hidden rounded-full">
          <Image
            src={faceImage}
            alt="Woman applying skincare product"
            fill
            priority
            sizes="(max-width: 640px) 168px, 184px"
            className="object-cover object-center"
          />
        </div>

        <ConcernPill
          label="ACNE SCARS"
          icon="/svgs/Vector (5).svg"
          widthClassName="w-auto"
          {...pillProps}
          className="absolute left-0 top-[58%] z-10 -translate-x-[68%] sm:top-[60%] sm:-translate-x-[72%]"
        />
        <ConcernPill
          label="ACNE SCARS"
          icon="/svgs/Vector (5).svg"
          widthClassName="w-auto"
          {...pillProps}
          className="absolute right-0 top-[14%] z-10 translate-x-[68%] sm:translate-x-[72%]"
        />
      </div>

      <StepBody>
        <StepChoiceList>
          {choiceOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="indicator-end"
              label={option.label}
              selected={selectedChoice === option.value}
              onSelect={() => setSelectedChoice(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
