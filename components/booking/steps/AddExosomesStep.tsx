"use client";

import { useState } from "react";

type AddExosomesChoice = "yes" | "not-now";

const choiceOptions: { value: AddExosomesChoice; label: string }[] = [
  { value: "yes", label: "Yes, include it" },
  { value: "not-now", label: "Not now" },
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

export default function AddExosomesStep() {
  const [selectedChoice, setSelectedChoice] = useState<AddExosomesChoice | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Add exosomes-powered care to your routine?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Helps boost collagen &amp; skin repair
        </p>
      </header>

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
