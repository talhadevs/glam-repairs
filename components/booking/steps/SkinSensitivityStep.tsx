"use client";

import Image from "next/image";
import { useState } from "react";

type SensitivityChoice = "sensitive" | "non-sensitive";

const sensitivityOptions: {
  value: SensitivityChoice;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "sensitive",
    label: "Sensitive",
    description:
      "My skin often reacts badly. Redness, dryness and flakiness, itching and burning sensations",
    icon: "/svgs/Group 2085660888.svg",
  },
  {
    value: "non-sensitive",
    label: "Non-Sensitive",
    description:
      "My skin shows no reaction to certain ingredients or to changing skincare products",
    icon: "/svgs/Group 2085660887.svg",
  },
];

function SensitivityOptionCard({
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

export default function SkinSensitivityStep() {
  const [selectedChoice, setSelectedChoice] = useState<SensitivityChoice | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Do you feel your skin is sensitive?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {sensitivityOptions.map((option) => (
          <SensitivityOptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={selectedChoice === option.value}
            onSelect={() => setSelectedChoice(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
