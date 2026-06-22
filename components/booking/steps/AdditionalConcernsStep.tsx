"use client";

import Image from "next/image";
import { useState } from "react";

type AdditionalConcern =
  | "dryness"
  | "oiliness"
  | "textural"
  | "puffy-eyes"
  | "crows-feet"
  | "double-chin"
  | "dark-circles"
  | "sagging-skin";

type ConcernOption = {
  value: AdditionalConcern;
  label: string;
  icon: string;
};

const concernOptions: ConcernOption[] = [
  { value: "dryness", label: "Dryness", icon: "/svgs/Group (16).svg" },
  {
    value: "oiliness",
    label: "Oiliness",
    icon: "/svgs/Group 2085660788.svg",
  },
  {
    value: "textural",
    label: "Textural",
    icon: "/svgs/Group 2085660843.svg",
  },
  {
    value: "puffy-eyes",
    label: "Puffy eyes",
    icon: "/svgs/Group 2085660844.svg",
  },
  {
    value: "crows-feet",
    label: "Crow's feet",
    icon: "/svgs/Group 2085660845.svg",
  },
  {
    value: "double-chin",
    label: "Double chin",
    icon: "/svgs/Group 2085660846.svg",
  },
  {
    value: "dark-circles",
    label: "Dark circles",
    icon: "/svgs/Group 2085660860.svg",
  },
  {
    value: "sagging-skin",
    label: "Sagging skin",
    icon: "/svgs/Group 2085660880.svg",
  },
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

function ConcernOptionCard({
  label,
  icon,
  selected,
  onSelect,
}: {
  label: string;
  icon: string;
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
      }`}
    >
      <span className="flex h-10 w-11 shrink-0 items-center justify-center sm:h-11 sm:w-12">
        <Image
          src={icon}
          alt=""
          width={48}
          height={48}
          className="h-10 w-10 object-contain sm:h-11 sm:w-11"
        />
      </span>

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

export default function AdditionalConcernsStep() {
  const [selectedConcerns, setSelectedConcerns] = useState<AdditionalConcern[]>(
    [],
  );

  const toggleConcern = (value: AdditionalConcern) => {
    setSelectedConcerns((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Any additional concerns?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Identifying these helps us create a treatment program for your desired
          skin appearance
        </p>
      </header>

      <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
        {concernOptions.map((option) => (
          <ConcernOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedConcerns.includes(option.value)}
            onSelect={() => toggleConcern(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
