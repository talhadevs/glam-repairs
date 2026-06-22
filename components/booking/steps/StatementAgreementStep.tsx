"use client";

import { useState } from "react";

const scaleValues = [1, 2, 3, 4, 5] as const;

type AgreementRating = (typeof scaleValues)[number];

function ScaleButton({
  value,
  selected,
  onSelect,
}: {
  value: AgreementRating;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Rating ${value}`}
      className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium transition-colors sm:h-14 sm:w-14 sm:text-base ${
        selected
          ? "border-brand-light bg-brand-light text-white shadow-sm"
          : "border-brand-border-light/60 bg-white text-brand-ink hover:border-brand-lavender"
      }`}
    >
      {value}
    </button>
  );
}

export default function StatementAgreementStep({
  statement,
}: {
  statement: string;
}) {
  const [selectedRating, setSelectedRating] = useState<AgreementRating | null>(
    null,
  );

  return (
    <div>
      <header>
        <p className="text-sm text-brand-gray sm:text-[0.9375rem]">
          Did you relate to this statement?
        </p>
        <h1 className="mt-3 font-serif text-[1.75rem] leading-snug text-brand-ink sm:mt-4 sm:text-[2rem]">
          &ldquo;{statement}&rdquo;
        </h1>
      </header>

      <div className="mt-8 sm:mt-10">
        <div
          className="flex items-center justify-between gap-2"
          role="group"
          aria-label="Agreement scale from 1 to 5"
        >
          {scaleValues.map((value) => (
            <ScaleButton
              key={value}
              value={value}
              selected={selectedRating === value}
              onSelect={() => setSelectedRating(value)}
            />
          ))}
        </div>

        <div className="mt-3 flex items-start justify-between text-xs text-brand-gray sm:mt-4 sm:text-[0.8125rem]">
          <span>Strongly disagree</span>
          <span className="text-right">Strongly agree</span>
        </div>
      </div>
    </div>
  );
}
