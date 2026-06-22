"use client";

import Image from "next/image";
import { useState } from "react";

type MoisturizedChoice = "yes" | "sometimes-tight" | "no" | "dont-know";

type MoisturizedOption = {
  value: MoisturizedChoice;
  label: string;
  icon?: string;
};

const moisturizedOptions: MoisturizedOption[] = [
  { value: "yes", label: "Yes", icon: "/svgs/Group 2085660881.svg" },
  {
    value: "sometimes-tight",
    label: "Sometimes feel tightness",
    icon: "/svgs/Group 2085660882.svg",
  },
  {
    value: "no",
    label: "No, can't live without moisturizer",
    icon: "/svgs/Group 2085660883.svg",
  },
  { value: "dont-know", label: "I don't know" },
];

function MoisturizedOptionCard({
  label,
  icon,
  selected,
  onSelect,
}: {
  label: string;
  icon?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3.5 rounded-2xl border bg-white px-4 py-3.5 text-left shadow-sm transition-colors sm:gap-4 sm:px-5 sm:py-4 ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      } ${icon ? "" : "sm:pl-5"}`}
    >
      {icon ? (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11">
          <Image
            src={icon}
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />
        </span>
      ) : null}
      <span className="text-sm leading-snug text-brand-ink sm:text-[0.9375rem]">
        {label}
      </span>
    </button>
  );
}

export default function MoisturizedStep() {
  const [selectedChoice, setSelectedChoice] = useState<MoisturizedChoice | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Do you think your skin is well moisturized?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {moisturizedOptions.map((option) => (
          <MoisturizedOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedChoice === option.value}
            onSelect={() => setSelectedChoice(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
