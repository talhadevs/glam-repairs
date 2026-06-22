"use client";

import { useState } from "react";

type AcidsUsage = "yes-used" | "open-to-it" | "unsure" | "dont-want";

const acidsOptions: { value: AcidsUsage; label: string }[] = [
  { value: "yes-used", label: "Yes, I've used them" },
  { value: "open-to-it", label: "No, but open to it" },
  { value: "unsure", label: "Unsure if used them" },
  { value: "dont-want", label: "I don't want to use acids" },
];

function AcidsOptionCard({
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

export default function AcidsStep() {
  const [selectedUsage, setSelectedUsage] = useState<AcidsUsage | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Have you used skincare products with acids?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {acidsOptions.map((option) => (
          <AcidsOptionCard
            key={option.value}
            label={option.label}
            selected={selectedUsage === option.value}
            onSelect={() => setSelectedUsage(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
