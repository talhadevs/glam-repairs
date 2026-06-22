"use client";

import Image from "next/image";
import { useState } from "react";

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

function GlowOptionCard({
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

export default function KBeautyGlowStep() {
  const [selectedGlow, setSelectedGlow] = useState<KBeautyGlow | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Which K-beauty glow inspires you most?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {glowOptions.map((option) => (
          <GlowOptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={selectedGlow === option.value}
            onSelect={() => setSelectedGlow(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
