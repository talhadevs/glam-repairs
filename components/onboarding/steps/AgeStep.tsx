"use client";

import { useState } from "react";
import SelectionOptionCard from "@/components/onboarding/SelectionOptionCard";

type AgeRange =
  | "under-25"
  | "25-34"
  | "35-44"
  | "45-60"
  | "over-60";

const ageOptions: { value: AgeRange; label: string }[] = [
  { value: "under-25", label: "Under 25" },
  { value: "25-34", label: "25 - 34" },
  { value: "35-44", label: "35 - 44" },
  { value: "45-60", label: "45 - 60" },
  { value: "over-60", label: "Over 60" },
];

export default function AgeStep() {
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          How old are you?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]">
          Hormones have a big impact on how our skin looks and feels at every
          age
        </p>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {ageOptions.map((option) => (
          <SelectionOptionCard
            key={option.value}
            label={option.label}
            selected={selectedAge === option.value}
            onSelect={() => setSelectedAge(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
