"use client";

import Image from "next/image";
import { useState } from "react";

type KoreanIngredient =
  | "snail-mucin"
  | "ginseng"
  | "centella-asiatica"
  | "rice-water"
  | "green-tea"
  | "none";

type IngredientOption = {
  value: KoreanIngredient;
  label: string;
  icon?: string;
};

const ingredientOptions: IngredientOption[] = [
  {
    value: "snail-mucin",
    label: "Snail mucin",
    icon: "/svgs/Group (10).svg",
  },
  {
    value: "ginseng",
    label: "Ginseng",
    icon: "/svgs/Group (11).svg",
  },
  {
    value: "centella-asiatica",
    label: "Centella Asiatica",
    icon: "/svgs/Group (12).svg",
  },
  {
    value: "rice-water",
    label: "Rice water",
    icon: "/svgs/Group 2085660839.svg",
  },
  {
    value: "green-tea",
    label: "Green tea",
    icon: "/svgs/Layer_1.svg",
  },
  { value: "none", label: "None of above" },
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
    <span className="h-5 w-5 shrink-0 rounded-full border border-brand-border-light bg-white" />
  );
}

function IngredientOptionCard({
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
      }`}
    >
      {icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
          <Image
            src={icon}
            alt=""
            width={40}
            height={54}
            className="h-9 w-auto max-w-[2.125rem] object-contain sm:h-10"
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

export default function KoreanIngredientsStep() {
  const [selectedIngredients, setSelectedIngredients] = useState<
    KoreanIngredient[]
  >([]);

  const toggleIngredient = (value: KoreanIngredient) => {
    setSelectedIngredients((current) => {
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
          Any Korean ingredients you want to try?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Pick the K-beauty ingredients you&apos;re curious about:
        </p>
      </header>

      <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
        {ingredientOptions.map((option) => (
          <IngredientOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedIngredients.includes(option.value)}
            onSelect={() => toggleIngredient(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
