"use client";

import { useState, type ReactNode } from "react";

type SleepOption = "under-5" | "5-6" | "7-8" | "over-8";
type WaterOption = "under-4" | "4-6" | "7-8" | "over-8";
type StressOption = "low" | "moderate" | "high" | "very-high";
type DietOption = "dairy" | "sugar-fried" | "tea-coffee" | "home-cooked" | "skip-meals";

const sleepOptions: { value: SleepOption; label: string }[] = [
  { value: "under-5", label: "Less than 5 hours" },
  { value: "5-6", label: "5–6 hours" },
  { value: "7-8", label: "7–8 hours" },
  { value: "over-8", label: "More than 8 hours" },
];

const waterOptions: { value: WaterOption; label: string }[] = [
  { value: "under-4", label: "Less than 4 glasses" },
  { value: "4-6", label: "4–6 glasses" },
  { value: "7-8", label: "7–8 glasses" },
  { value: "over-8", label: "More than 8 glasses" },
];

const stressOptions: { value: StressOption; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
  { value: "very-high", label: "Very high" },
];

const dietOptions: { value: DietOption; label: string }[] = [
  { value: "dairy", label: "I eat a lot of dairy" },
  { value: "sugar-fried", label: "I eat a lot of sugar / fried food" },
  { value: "tea-coffee", label: "I drink tea or coffee daily" },
  { value: "home-cooked", label: "I eat mostly home-cooked food" },
  { value: "skip-meals", label: "I skip meals regularly" },
];

const sectionLabelClassName =
  "text-sm font-medium text-brand-ink sm:text-[0.9375rem]";

function RadioOptionCard({
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
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-sm transition-colors sm:px-5 sm:py-3.5 ${
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
      <span className="text-sm sm:text-[0.9375rem]">{label}</span>
    </button>
  );
}

function DietCheckboxCard({
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
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-sm transition-colors sm:px-5 sm:py-3.5 ${
        selected
          ? "border-brand-light bg-brand-light text-white"
          : "border-brand-border-light/60 bg-white text-brand-ink hover:border-brand-lavender"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
          selected
            ? "border-white bg-white text-brand-light"
            : "border-brand-border-light bg-white text-transparent"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 10 8"
          className="h-2.5 w-3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4.2L3.5 6.7L9 1.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm sm:text-[0.9375rem]">{label}</span>
    </button>
  );
}

function LifestyleSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className={sectionLabelClassName}>{title}</h2>
      <div className="mt-3 space-y-2.5 sm:space-y-3">{children}</div>
    </section>
  );
}

export default function LifestyleStep() {
  const [sleep, setSleep] = useState<SleepOption | null>(null);
  const [water, setWater] = useState<WaterOption | null>(null);
  const [stress, setStress] = useState<StressOption | null>(null);
  const [diet, setDiet] = useState<DietOption[]>([]);

  const toggleDiet = (value: DietOption) => {
    setDiet((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
          Lifestyle
        </p>
        <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Tell us a bit about your lifestyle — it affects your skin more than most
          people realize.
        </h1>
      </header>

      <div className="mt-6 space-y-6 sm:mt-7 sm:space-y-7">
        <LifestyleSection title="Sleep (per night on average):">
          {sleepOptions.map((option) => (
            <RadioOptionCard
              key={option.value}
              label={option.label}
              selected={sleep === option.value}
              onSelect={() => setSleep(option.value)}
            />
          ))}
        </LifestyleSection>

        <LifestyleSection title="Water intake (per day):">
          {waterOptions.map((option) => (
            <RadioOptionCard
              key={option.value}
              label={option.label}
              selected={water === option.value}
              onSelect={() => setWater(option.value)}
            />
          ))}
        </LifestyleSection>

        <LifestyleSection title="Stress level:">
          {stressOptions.map((option) => (
            <RadioOptionCard
              key={option.value}
              label={option.label}
              selected={stress === option.value}
              onSelect={() => setStress(option.value)}
            />
          ))}
        </LifestyleSection>

        <LifestyleSection title="Diet (select all that apply):">
          {dietOptions.map((option) => (
            <DietCheckboxCard
              key={option.value}
              label={option.label}
              selected={diet.includes(option.value)}
              onSelect={() => toggleDiet(option.value)}
            />
          ))}
        </LifestyleSection>
      </div>
    </div>
  );
}
