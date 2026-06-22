"use client";

import Image from "next/image";
import { useState } from "react";

type SkinType = "dry" | "normal" | "oily" | "combination";

const skinTypeOptions: {
  value: SkinType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "dry",
    label: "Dry skin type",
    description: "Lacks moisture, tends to feel tight, dull appearance, flakiness",
    icon: "/svgs/Group (4).svg",
  },
  {
    value: "normal",
    label: "Normal skin type",
    description: "Balanced oil and moisture, smooth texture, few visible concerns",
    icon: "/svgs/Group 2085660787.svg",
  },
  {
    value: "oily",
    label: "Oily skin type",
    description: "Excess sebum, enlarged pores, shiny appearance, prone to breakouts",
    icon: "/svgs/Group 2085660788.svg",
  },
  {
    value: "combination",
    label: "Combination skin type",
    description: "Oily T-zone with dry or normal cheeks and jawline",
    icon: "/svgs/Group 2085660786.svg",
  },
];

function SkinTypeOptionCard({
  label,
  description,
  icon,
  selected,
  onSelect,
}: {
  label: string;
  description: string;
  icon: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-start gap-4 rounded-2xl border bg-white px-4 py-4 text-left shadow-sm transition-colors sm:gap-5 sm:px-5 sm:py-[1.125rem] ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-[3.25rem] sm:w-[3.25rem]">
        <Image
          src={icon}
          alt=""
          width={52}
          height={52}
          className="h-11 w-auto object-contain sm:h-12"
        />
      </span>

      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block text-base font-semibold text-brand-ink sm:text-[1.05rem]">
          {label}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-brand-gray sm:text-[0.9375rem]">
          {description}
        </span>
      </span>
    </button>
  );
}

export default function SkinTypeStep() {
  const [selectedType, setSelectedType] = useState<SkinType | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What are your skin concerns?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          We will create a treatment skin care program based on your answers
        </p>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {skinTypeOptions.map((option) => (
          <SkinTypeOptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={selectedType === option.value}
            onSelect={() => setSelectedType(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
