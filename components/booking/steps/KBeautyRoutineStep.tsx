"use client";

import Image from "next/image";
import { useState } from "react";

import ConcernPill from "@/components/home/ConcernPill";

type KBeautyChoice = "yes" | "not-now";

const faceImage = "/svgs/Rectangle 3467689 (1).svg";

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

function SelectionIndicator({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light">
        <svg
          aria-hidden
          viewBox="0 0 12 10"
          className="h-2.5 w-3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.2L4.2 8.4L11 1.6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="h-5 w-5 shrink-0 rounded-full border border-brand-border-light bg-white" />
  );
}

function ChoiceOptionCard({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border bg-white px-4 py-3.5 text-left shadow-sm transition-colors sm:px-5 sm:py-4 ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      }`}
    >
      <span className="text-sm text-brand-ink sm:text-[0.9375rem]">{label}</span>
      <SelectionIndicator selected={selected} />
    </button>
  );
}

export default function KBeautyRoutineStep() {
  const [selectedChoice, setSelectedChoice] = useState<KBeautyChoice>("yes");

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Should Glam add Korean Skincare (K-Beauty) routine to your plan?
        </h1>
      </header>

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

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {choiceOptions.map((option) => (
          <ChoiceOptionCard
            key={option.value}
            label={option.label}
            selected={selectedChoice === option.value}
            onSelect={() => setSelectedChoice(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
