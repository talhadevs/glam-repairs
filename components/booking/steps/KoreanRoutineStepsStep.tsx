"use client";

import { useState } from "react";

type RoutineLength = "minimal" | "balanced" | "full";

const routineLengthOptions: { value: RoutineLength; label: string }[] = [
  { value: "minimal", label: "Minimal (2-3 steps)" },
  { value: "balanced", label: "Balanced (4-5 steps)" },
  { value: "full", label: "Full Korean routine (7+ steps)" },
];

function RoutineLengthOptionCard({
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

export default function KoreanRoutineStepsStep() {
  const [selectedLength, setSelectedLength] = useState<RoutineLength | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          How many steps do you want in your Korean skincare routine?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {routineLengthOptions.map((option) => (
          <RoutineLengthOptionCard
            key={option.value}
            label={option.label}
            selected={selectedLength === option.value}
            onSelect={() => setSelectedLength(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
