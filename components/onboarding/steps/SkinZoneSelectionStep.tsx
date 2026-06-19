"use client";

import { useState } from "react";

type SkinZone =  | "whole-face"
  | "forehead"
  | "eyes"
  | "cheeks"
  | "nose-tzone"
  | "chin-jawline"
  | "neck";

const skinZoneOptions: { value: SkinZone; label: string }[] = [
  { value: "whole-face", label: "Whole face" },
  { value: "forehead", label: "Forehead" },
  { value: "eyes", label: "Eyes / under-eye area" },
  { value: "cheeks", label: "Cheeks" },
  { value: "nose-tzone", label: "Nose & T-zone" },
  { value: "chin-jawline", label: "Chin & jawline" },
  { value: "neck", label: "Neck" },
];

function ZoneOptionCard({
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
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left shadow-sm transition-colors sm:gap-4 sm:px-5 sm:py-4 ${
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

      <span className="flex-1 text-base sm:text-[1.05rem]">{label}</span>
    </button>
  );
}

export default function SkinZoneSelectionStep() {
  const [selectedZones, setSelectedZones] = useState<SkinZone[]>([]);

  const toggleZone = (value: SkinZone) => {
    setSelectedZones((current) => {
      if (value === "whole-face") {
        return current.includes("whole-face") ? [] : ["whole-face"];
      }

      const withoutWholeFace = current.filter((item) => item !== "whole-face");

      if (withoutWholeFace.includes(value)) {
        return withoutWholeFace.filter((item) => item !== value);
      }

      return [...withoutWholeFace, value];
    });
  };

  return (
    <div>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
          Skin Zone Selection
        </p>
        <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What areas of your skin are you most concerned about?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">        {skinZoneOptions.map((option) => (
          <ZoneOptionCard
            key={option.value}
            label={option.label}
            selected={selectedZones.includes(option.value)}
            onSelect={() => toggleZone(option.value)}
          />
        ))}
      </div>

      <p className="mt-5 text-sm text-brand-gray sm:mt-6 sm:text-[0.9375rem]">
        Select all that apply.
      </p>
    </div>
  );
}
