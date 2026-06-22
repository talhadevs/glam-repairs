"use client";

import { useState } from "react";

type SunscreenHabit =
  | "always"
  | "sunny-weather"
  | "sometimes"
  | "rarely"
  | "never";

const sunscreenOptions: { value: SunscreenHabit; label: string }[] = [
  { value: "always", label: "Yes, always" },
  { value: "sunny-weather", label: "Yes, only in sunny weather" },
  { value: "sometimes", label: "Sometimes" },
  { value: "rarely", label: "Rarely" },
  { value: "never", label: "Never" },
];

function SunscreenOptionCard({
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

export default function SunscreenStep() {
  const [selectedHabit, setSelectedHabit] = useState<SunscreenHabit | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Do you wear sunscreen outdoors?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {sunscreenOptions.map((option) => (
          <SunscreenOptionCard
            key={option.value}
            label={option.label}
            selected={selectedHabit === option.value}
            onSelect={() => setSelectedHabit(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
