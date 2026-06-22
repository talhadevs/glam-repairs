"use client";

import { useState } from "react";

type SleepChoice = "minimal" | "some" | "long-well" | "like-to-sleep";

const sleepOptions: { value: SleepChoice; label: string }[] = [
  { value: "minimal", label: "Minimal rest (less than 5 hours)" },
  { value: "some", label: "I get some shut-eye (5-6 hours)" },
  { value: "long-well", label: "I sleep long and well (7-8 hours)" },
  { value: "like-to-sleep", label: "I like to sleep (8+ hours)" },
];

function SleepOptionCard({
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

export default function SleepStep() {
  const [selectedChoice, setSelectedChoice] = useState<SleepChoice | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          How much sleep do you usually get?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {sleepOptions.map((option) => (
          <SleepOptionCard
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
