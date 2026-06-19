"use client";

import Image from "next/image";
import { useState } from "react";

type SkinConcern =
  | "acne-marks"
  | "dark-patches"
  | "redness"
  | "dullness"
  | "uneven-tone"
  | "cream-damage"
  | "nothing";

const skinConcernOptions: {
  value: SkinConcern;
  label: string;
  icon?: string;
}[] = [
  {
    value: "acne-marks",
    label: "Acne marks",
    icon: "/svgs/Group 2085660911.svg",
  },
  {
    value: "dark-patches",
    label: "Dark patches",
    icon: "/svgs/Group 2085660913.svg",
  },
  {
    value: "redness",
    label: "Redness",
    icon: "/svgs/Group 2085660912.svg",
  },
  {
    value: "dullness",
    label: "Dullness",
    icon: "/svgs/Group (3).svg",
  },
  {
    value: "uneven-tone",
    label: "Uneven tone",
    icon: "/svgs/Group 2085660783.svg",
  },
  {
    value: "cream-damage",
    label: "Cream damage",
    icon: "/svgs/Group 2085660914.svg",
  },
  {
    value: "nothing",
    label: "Nothing from above",
  },
];

function SkinConcernOptionCard({
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
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left shadow-sm transition-colors sm:gap-4 sm:px-5 sm:py-4 ${
        selected
          ? "border-brand-light bg-brand-light text-white"
          : "border-brand-border-light/60 bg-white text-brand-ink hover:border-brand-lavender"
      }`}
    >
      {icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
          <Image
            src={icon}
            alt=""
            width={36}
            height={36}
            className={`h-8 w-8 object-contain sm:h-9 sm:w-9 ${selected ? "brightness-0 invert" : ""}`}
          />
        </span>
      ) : (
        <span className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      )}

      <span className="flex-1 text-base sm:text-[1.05rem]">{label}</span>

      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-white bg-white text-brand-light"
            : "border-brand-border-light bg-white text-transparent"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 10 8"
          className="h-2 w-2.5"
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
    </button>
  );
}

export default function SkinConcernsStep() {
  const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>([]);

  const toggleConcern = (value: SkinConcern) => {
    setSelectedConcerns((current) => {
      if (value === "nothing") {
        return current.includes("nothing") ? [] : ["nothing"];
      }

      const withoutNothing = current.filter((item) => item !== "nothing");

      if (withoutNothing.includes(value)) {
        return withoutNothing.filter((item) => item !== value);
      }

      return [...withoutNothing, value];
    });
  };

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What are your skin concerns?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]">
          will create a treatment skin care program based on your answers
        </p>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {skinConcernOptions.map((option) => (
          <SkinConcernOptionCard
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
