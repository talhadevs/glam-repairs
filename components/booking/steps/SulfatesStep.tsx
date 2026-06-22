"use client";

import { useState } from "react";

type SulfatesUsage = "yes-used" | "no-avoid" | "unsure";

const sulfatesOptions: { value: SulfatesUsage; label: string }[] = [
  { value: "yes-used", label: "Yes, I've used them" },
  { value: "no-avoid", label: "No, I avoid them" },
  { value: "unsure", label: "Unsure if i have them" },
];

function SulfatesOptionCard({
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

export default function SulfatesStep() {
  const [selectedUsage, setSelectedUsage] = useState<SulfatesUsage | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Have you used skincare products that contain sulfates?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {sulfatesOptions.map((option) => (
          <SulfatesOptionCard
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
