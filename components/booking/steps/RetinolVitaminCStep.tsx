"use client";

import { useState } from "react";

type RetinolVitaminCAwareness =
  | "yes-used"
  | "interested"
  | "heard-unsure";

const awarenessOptions: { value: RetinolVitaminCAwareness; label: string }[] =
  [
    { value: "yes-used", label: "Yes, I've used them" },
    { value: "interested", label: "No, but interested" },
    { value: "heard-unsure", label: "Heard, but unsure" },
  ];

function AwarenessOptionCard({
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

export default function RetinolVitaminCStep() {
  const [selectedAwareness, setSelectedAwareness] =
    useState<RetinolVitaminCAwareness | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Are you aware of the benefits of retinol and vitamin C for skin?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {awarenessOptions.map((option) => (
          <AwarenessOptionCard
            key={option.value}
            label={option.label}
            selected={selectedAwareness === option.value}
            onSelect={() => setSelectedAwareness(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
