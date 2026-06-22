"use client";

import Image from "next/image";
import { useState } from "react";

type RoutineFrequency =
  | "morning-and-evening"
  | "morning-only"
  | "evening-only"
  | "none";

type RoutineOption = {
  value: RoutineFrequency;
  label: string;
  icon?: string;
};

const routineOptions: RoutineOption[] = [
  {
    value: "morning-and-evening",
    label: "Yes, i have a morning and an evening routine",
    icon: "/svgs/Group (8).svg",
  },
  {
    value: "morning-only",
    label: "Only a morning one",
    icon: "/svgs/afternoon_11930102 2.svg",
  },
  {
    value: "evening-only",
    label: "Only an evening one",
    icon: "/svgs/moon_7105089 1.svg",
  },
  {
    value: "none",
    label: "No, i don't have any routine",
  },
];

function RoutineOptionCard({
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
      className={`flex w-full items-center gap-3.5 rounded-2xl border bg-white px-4 py-3.5 text-left shadow-sm transition-colors sm:gap-4 sm:px-5 sm:py-4 ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      } ${icon ? "" : "sm:pl-5"}`}
    >
      {icon ? (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11">
          <Image
            src={icon}
            alt=""
            width={50}
            height={50}
            className="h-10 w-auto object-contain sm:h-11"
          />
        </span>
      ) : null}
      <span className="text-sm leading-snug text-brand-ink sm:text-[0.9375rem]">
        {label}
      </span>
    </button>
  );
}

export default function DailyRoutineStep() {
  const [selectedRoutine, setSelectedRoutine] =
    useState<RoutineFrequency>("morning-and-evening");

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Do you have daily skin care routine?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {routineOptions.map((option) => (
          <RoutineOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedRoutine === option.value}
            onSelect={() => setSelectedRoutine(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
