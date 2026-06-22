"use client";

import Image from "next/image";
import { useState } from "react";

import ConcernPill from "@/components/home/ConcernPill";

type ExosomesChoice = "actively-look" | "heard-of-them" | "not-really";

const faceImage = "/svgs/Rectangle 3467689 (2).svg";

const pillProps = {
  paddingClassName: "py-0.5 pl-1 pr-2 sm:py-1 sm:pl-1.5 sm:pr-2.5",
  iconWrapSizeClassName: "h-6 w-6 sm:h-7 sm:w-7",
  iconImageClassName: "h-3 w-3 sm:h-3.5 sm:w-3.5",
  labelClassName:
    "shrink-0 whitespace-nowrap pl-1.5 text-[11px] font-normal uppercase tracking-wide text-brand-primary sm:pl-2 sm:text-[12px]",
} as const;

const choiceOptions: { value: ExosomesChoice; label: string }[] = [
  { value: "actively-look", label: "Yes, i actively look for them" },
  { value: "heard-of-them", label: "I've heard of them" },
  { value: "not-really", label: "Not really" },
];

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
      className={`flex w-full items-center rounded-2xl border bg-white px-4 py-3.5 text-left shadow-sm transition-colors sm:px-5 sm:py-4 ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      }`}
    >
      <span className="text-sm text-brand-ink sm:text-[0.9375rem]">{label}</span>
    </button>
  );
}

export default function ExosomesStep() {
  const [selectedChoice, setSelectedChoice] = useState<ExosomesChoice | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Have you heard about advanced skincare ingredients like exosomes?
        </h1>
      </header>

      <div className="relative mx-auto mt-6 w-[9.5rem] overflow-visible sm:mt-7 sm:w-[10.5rem]">
        <div className="relative aspect-[224/298] w-full overflow-hidden rounded-[50%]">
          <Image
            src={faceImage}
            alt="Close-up of skin with product application"
            fill
            priority
            sizes="(max-width: 640px) 152px, 168px"
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
