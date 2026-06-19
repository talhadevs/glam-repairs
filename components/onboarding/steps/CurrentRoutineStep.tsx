"use client";

import { useState } from "react";

const inputClassName =
  "w-full rounded-2xl border border-brand-border-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[15px]";

const labelClassName = "mb-2 block text-sm text-brand-ink sm:text-[0.9375rem]";

type RoutineOption =
  | "none"
  | "face-wash-only"
  | "wash-moisturizer"
  | "wash-moisturizer-spf"
  | "full-routine"
  | "not-working";

const routineOptions: { value: RoutineOption; label: string }[] = [
  { value: "none", label: "I don't have one — I use whatever is available" },
  { value: "face-wash-only", label: "Just a face wash (nothing else)" },
  { value: "wash-moisturizer", label: "Face wash + moisturizer" },
  { value: "wash-moisturizer-spf", label: "Face wash + moisturizer + sunscreen" },
  {
    value: "full-routine",
    label: "A full routine (cleanser, toner, serum, moisturizer, SPF)",
  },
  { value: "not-working", label: "I follow a routine but it's not working" },
];

function RoutineOptionCard({
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

export default function CurrentRoutineStep() {
  const [selectedRoutine, setSelectedRoutine] = useState<RoutineOption | null>(null);
  const [productsUsed, setProductsUsed] = useState("");

  return (
    <div>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
          Your Current Routine
        </p>
        <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What does your current skincare routine look like?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {routineOptions.map((option) => (
          <RoutineOptionCard
            key={option.value}
            label={option.label}
            selected={selectedRoutine === option.value}
            onSelect={() => setSelectedRoutine(option.value)}
          />
        ))}
      </div>

      <div className="mt-6 sm:mt-7">
        <label htmlFor="products-used" className={labelClassName}>
          List any products or ingredients you currently use (optional — even a product type
          helps):
        </label>
        <textarea
          id="products-used"
          name="productsUsed"
          rows={3}
          placeholder="e.g. salicylic acid cleanser, vitamin C serum, drugstore moisturizer"
          value={productsUsed}
          onChange={(event) => setProductsUsed(event.target.value)}
          className={`${inputClassName} resize-none`}
        />
      </div>
    </div>
  );
}
