"use client";

import Image from "next/image";
import { useState } from "react";

type DaytimeBother = "dull-skin" | "tiny-wrinkles" | "tightness" | "none";

type BotherOption = {
  value: DaytimeBother;
  label: string;
  icon?: string;
};

const botherOptions: BotherOption[] = [
  {
    value: "dull-skin",
    label: "Dull skin",
    icon: "/svgs/Group 2085660912.svg",
  },
  {
    value: "tiny-wrinkles",
    label: "Tiny wrinkles",
    icon: "/svgs/Group 2085660914.svg",
  },
  {
    value: "tightness",
    label: "Tightness",
    icon: "/svgs/Group 2085660882.svg",
  },
  { value: "none", label: "None of that" },
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

function BotherOptionCard({
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
      className={`flex w-full items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 text-left transition-colors sm:gap-4 sm:px-4 sm:py-3.5 ${
        selected
          ? "border-brand-light shadow-none ring-1 ring-brand-light"
          : "border-transparent shadow-[0_4px_24px_rgba(189,168,212,0.45)] hover:border-brand-lavender/60"
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

export default function DaytimeSkinBothersStep() {
  const [selectedBothers, setSelectedBothers] = useState<DaytimeBother[]>([]);

  const toggleBother = (value: DaytimeBother) => {
    setSelectedBothers((current) => {
      if (value === "none") {
        return current.includes("none") ? [] : ["none"];
      }

      const withoutNone = current.filter((item) => item !== "none");

      if (withoutNone.includes(value)) {
        return withoutNone.filter((item) => item !== value);
      }

      return [...withoutNone, value];
    });
  };

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What bothers your skin during the day?
        </h1>
      </header>

      <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
        {botherOptions.map((option) => (
          <BotherOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedBothers.includes(option.value)}
            onSelect={() => toggleBother(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
