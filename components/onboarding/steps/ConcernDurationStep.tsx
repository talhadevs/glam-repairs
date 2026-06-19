"use client";

import { useState } from "react";

const inputClassName =
  "w-full rounded-2xl border border-brand-border-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[15px]";

const labelClassName = "mb-2 block text-sm text-brand-ink sm:text-[0.9375rem]";

type DurationOption =
  | "under-1-month"
  | "1-6-months"
  | "about-a-year"
  | "several-years"
  | "most-of-life";

const durationOptions: { value: DurationOption; label: string }[] = [
  { value: "under-1-month", label: "Just started (under 1 month)" },
  { value: "1-6-months", label: "A few months (1–6 months)" },
  { value: "about-a-year", label: "About a year" },
  { value: "several-years", label: "Several years" },
  { value: "most-of-life", label: "Most of my life" },
];

function DurationOptionCard({
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
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left shadow-sm transition-colors sm:gap-4 sm:px-5 sm:py-4 ${
        selected
          ? "border-brand-light bg-brand-light text-white"
          : "border-brand-border-light/60 bg-white text-brand-ink hover:border-brand-lavender"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-white bg-white"
            : "border-brand-border-light bg-white"
        }`}
      >
        {selected ? <span className="h-2.5 w-2.5 rounded-full bg-brand-light" /> : null}
      </span>

      <span className="flex-1 text-base sm:text-[1.05rem]">{label}</span>
    </button>
  );
}

export default function ConcernDurationStep() {
  const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null);
  const [worseningFactors, setWorseningFactors] = useState("");

  return (
    <div>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
          Concern Duration
        </p>
        <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          How long have you been dealing with this?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {durationOptions.map((option) => (
          <DurationOptionCard
            key={option.value}
            label={option.label}
            selected={selectedDuration === option.value}
            onSelect={() => setSelectedDuration(option.value)}
          />
        ))}
      </div>

      <div className="mt-6 sm:mt-7">
        <label htmlFor="worsening-factors" className={labelClassName}>
          Is there anything that makes it worse? (e.g. stress, food, season, products)
        </label>
        <textarea
          id="worsening-factors"
          name="worseningFactors"
          rows={3}
          placeholder="Optional — share anything that triggers or worsens your concern"
          value={worseningFactors}
          onChange={(event) => setWorseningFactors(event.target.value)}
          className={`${inputClassName} resize-none`}
        />
      </div>
    </div>
  );
}
