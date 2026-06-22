"use client";

import { useState } from "react";

type RoutineTimeChoice = "ten-minutes" | "twenty-minutes" | "one-hour" | "even-more";

const routineTimeOptions: { value: RoutineTimeChoice; label: string }[] = [
  { value: "ten-minutes", label: "10 minutes" },
  { value: "twenty-minutes", label: "20 minutes" },
  { value: "one-hour", label: "1 hour" },
  { value: "even-more", label: "Even more" },
];

function RoutineTimeOptionCard({
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

export default function SkincareRoutineTimeStep() {
  const [selectedChoice, setSelectedChoice] = useState<RoutineTimeChoice | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          How much time do you spend on your daily skin care routine?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {routineTimeOptions.map((option) => (
          <RoutineTimeOptionCard
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
