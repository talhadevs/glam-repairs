"use client";

import { useState } from "react";

type StressChoice = "yes-every-day" | "often" | "rarely" | "never";

const stressOptions: { value: StressChoice; label: string }[] = [
  { value: "yes-every-day", label: "Yes, every day" },
  { value: "often", label: "Often" },
  { value: "rarely", label: "Rarely" },
  { value: "never", label: "Never" },
];

function StressOptionCard({
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

export default function StressStep() {
  const [selectedChoice, setSelectedChoice] = useState<StressChoice | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Do you often feel stressed and tense?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Stress increases cortisol and adrenaline, causing inflammation and
          skin issues like acne, eczema, or psoriasis
        </p>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {stressOptions.map((option) => (
          <StressOptionCard
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
