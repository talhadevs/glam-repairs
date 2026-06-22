"use client";

import { useState } from "react";

type SkinTone =
  | "very-fair"
  | "fair"
  | "medium"
  | "tan"
  | "deep"
  | "light-rose"
  | "terracotta"
  | "caramel"
  | "sandy-beige"
  | "not-sure";

type SkinToneOption = {
  value: SkinTone;
  label: string;
  color?: string;
};

const skinToneOptions: SkinToneOption[] = [
  { value: "very-fair", label: "Very fair", color: "#F8DCC8" },
  { value: "fair", label: "Fair", color: "#E8B98A" },
  { value: "medium", label: "Medium", color: "#C68642" },
  { value: "tan", label: "Tan", color: "#8B5A2B" },
  { value: "deep", label: "Deep", color: "#4A2C17" },
];

const additionalSkinToneOptions: SkinToneOption[] = [
  { value: "light-rose", label: "Light rose", color: "#E8B4A8" },
  { value: "terracotta", label: "Terracotta", color: "#C9977A" },
  { value: "caramel", label: "Caramel", color: "#B8734A" },
  { value: "sandy-beige", label: "Sandy beige", color: "#D4C4A8" },
  { value: "not-sure", label: "Not sure" },
];

function SkinToneOptionCard({
  label,
  color,
  selected,
  onSelect,
}: {
  label: string;
  color?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-4 rounded-2xl border bg-white px-4 py-3.5 text-left shadow-sm transition-colors sm:gap-5 sm:px-5 sm:py-4 ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      } ${color ? "" : "justify-center sm:justify-start"}`}
    >
      {color ? (
        <span
          className="h-9 w-9 shrink-0 rounded-full border border-black/5 sm:h-10 sm:w-10"
          style={{ backgroundColor: color }}
          aria-hidden
        />
      ) : null}
      <span className="text-sm text-brand-ink sm:text-[0.9375rem]">{label}</span>
    </button>
  );
}

export default function SkinToneStep() {
  const [selectedTone, setSelectedTone] = useState<SkinTone | null>(null);
  const [showMore, setShowMore] = useState(false);

  const visibleOptions = showMore
    ? [...skinToneOptions, ...additionalSkinToneOptions]
    : skinToneOptions;

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What is color closest to your skin tone?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Get extra skin renewal and glow with this advanced serum
        </p>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {visibleOptions.map((option) => (
          <SkinToneOptionCard
            key={option.value}
            label={option.label}
            color={option.color}
            selected={selectedTone === option.value}
            onSelect={() => setSelectedTone(option.value)}
          />
        ))}

        {!showMore ? (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="w-full pt-1 text-center text-sm font-medium text-brand-light transition-opacity hover:opacity-80 sm:text-[0.9375rem]"
          >
            Show more
          </button>
        ) : null}
      </div>
    </div>
  );
}
