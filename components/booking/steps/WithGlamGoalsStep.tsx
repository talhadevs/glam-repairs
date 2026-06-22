"use client";

import Image from "next/image";
import { useState } from "react";

type WithGlamGoal =
  | "reduce-acne-redness"
  | "best-routine"
  | "learn-ingredients"
  | "save-money"
  | "prevent-aging"
  | "other";

type GoalOption = {
  value: WithGlamGoal;
  label: string;
  icon?: string;
};

const goalOptions: GoalOption[] = [
  {
    value: "reduce-acne-redness",
    label: "Reduce acne, redness, or sensitivity",
    icon: "/svgs/Sun_Allergy.svg",
  },
  {
    value: "best-routine",
    label: "Find the best skincare routine for my skin",
    icon: "/svgs/Group (25).svg",
  },
  {
    value: "learn-ingredients",
    label: "Learn skincare ingredients",
    icon: "/svgs/Group 2085660853.svg",
  },
  {
    value: "save-money",
    label: "Save money on skincare",
    icon: "/svgs/Group 2085660854.svg",
  },
  {
    value: "prevent-aging",
    label: "Prevent early signs of aging",
    icon: "/svgs/Group 2085660896.svg",
  },
  { value: "other", label: "Other" },
];

function SelectionIndicator({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light">
        <svg
          aria-hidden
          viewBox="0 0 12 10"
          className="h-2.5 w-3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.2L4.2 8.4L11 1.6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="h-5 w-5 shrink-0 rounded-full border border-brand-lavender bg-white" />
  );
}

function GoalOptionCard({
  label,
  icon,
  selected,
  onSelect,
}: {
  label: string;
  icon?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 text-left shadow-sm transition-colors sm:gap-4 sm:px-4 sm:py-3.5 ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      } ${icon ? "" : "sm:pl-5"}`}
    >
      {icon ? (
        <span className="flex h-10 w-11 shrink-0 items-center justify-center sm:h-11 sm:w-12">
          <Image
            src={icon}
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />
        </span>
      ) : null}

      <span
        className={`min-w-0 flex-1 text-sm sm:text-[0.9375rem] ${
          selected ? "text-brand-light" : "text-brand-ink"
        }`}
      >
        {label}
      </span>

      <SelectionIndicator selected={selected} />
    </button>
  );
}

export default function WithGlamGoalsStep() {
  const [selectedGoals, setSelectedGoals] = useState<WithGlamGoal[]>([]);

  const toggleGoal = (value: WithGlamGoal) => {
    setSelectedGoals((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          With glam, I&apos;d like to
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Select all that apply
        </p>
      </header>

      <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
        {goalOptions.map((option) => (
          <GoalOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedGoals.includes(option.value)}
            onSelect={() => toggleGoal(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
