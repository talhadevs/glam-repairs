"use client";

import { useState } from "react";

type WaterIntakeChoice = "coffee-tea-only" | "two-glasses" | "two-to-six" | "more-than-six";

const waterIntakeOptions: { value: WaterIntakeChoice; label: string }[] = [
  { value: "coffee-tea-only", label: "I only have coffee or tea" },
  { value: "two-glasses", label: "About 2 glasses (16 oz.)" },
  { value: "two-to-six", label: "2 to 6 glasses (16 - 48 oz.)" },
  { value: "more-than-six", label: "More than 6 glasses" },
];

function WaterIntakeOptionCard({
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
      <span className="text-sm leading-snug text-brand-ink sm:text-[0.9375rem]">
        {label}
      </span>
    </button>
  );
}

export default function WaterIntakeStep() {
  const [selectedChoice, setSelectedChoice] = useState<WaterIntakeChoice | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What is your daily water intake?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {waterIntakeOptions.map((option) => (
          <WaterIntakeOptionCard
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
