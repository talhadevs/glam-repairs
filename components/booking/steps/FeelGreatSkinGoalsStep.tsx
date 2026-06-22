"use client";

import Image from "next/image";
import { useState } from "react";

type FeelGreatGoal =
  | "makeup-free"
  | "best-at-events"
  | "great-pics"
  | "inspire-loved-ones"
  | "social-media-glow"
  | "other";

type GoalOption = {
  value: FeelGreatGoal;
  label: string;
  icon?: string;
};

const goalOptions: GoalOption[] = [
  {
    value: "makeup-free",
    label: "Confidently makeup-free",
    icon: "/svgs/Group (19).svg",
  },
  {
    value: "best-at-events",
    label: "Feel my best at events",
    icon: "/svgs/Group (20).svg",
  },
  {
    value: "great-pics",
    label: "Take great pics",
    icon: "/svgs/Group (21).svg",
  },
  {
    value: "inspire-loved-ones",
    label: "Inspire the ones i love",
    icon: "/svgs/Group 2085660856.svg",
  },
  {
    value: "social-media-glow",
    label: "Glow on social media",
    icon: "/svgs/Mask group.svg",
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

export default function FeelGreatSkinGoalsStep() {
  const [selectedGoals, setSelectedGoals] = useState<FeelGreatGoal[]>([]);

  const toggleGoal = (value: FeelGreatGoal) => {
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
          When i feel great about my skin, I&apos;d like to
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
