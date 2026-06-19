"use client";

import Image from "next/image";
import { useState } from "react";

const inputClassName =
  "w-full rounded-2xl border border-brand-border-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[15px]";

type PrimaryConcern =
  | "acne-breakouts"
  | "dark-spots"
  | "dryness"
  | "oiliness"
  | "uneven-tone"
  | "acne-scars"
  | "sensitivity"
  | "fine-lines"
  | "other";

const primaryConcernOptions: {
  value: PrimaryConcern;
  label: string;
  icon?: string;
}[] = [
  {
    value: "acne-breakouts",
    label: "Acne & breakouts",
    icon: "/svgs/Group 2085660911.svg",
  },
  {
    value: "dark-spots",
    label: "Dark spots & pigmentation",
    icon: "/svgs/Group 2085660913.svg",
  },
  {
    value: "dryness",
    label: "Dryness & flakiness",
    icon: "/svgs/skin_concern.svg",
  },
  {
    value: "oiliness",
    label: "Oiliness & large pores",
    icon: "/svgs/Group 2085660914.svg",
  },
  {
    value: "uneven-tone",
    label: "Uneven skin tone",
    icon: "/svgs/Group 2085660783.svg",
  },
  {
    value: "acne-scars",
    label: "Acne scars & marks",
    icon: "/svgs/Vector (5).svg",
  },
  {
    value: "sensitivity",
    label: "Sensitivity & redness",
    icon: "/svgs/Group 2085660912.svg",
  },
  {
    value: "fine-lines",
    label: "Fine lines & dullness",
    icon: "/svgs/Group (3).svg",
  },
  {
    value: "other",
    label: "Other (describe below)",
  },
];

function PrimaryConcernOptionCard({
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
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-white bg-white"
            : "border-brand-border-light bg-white"
        }`}
      >
        {selected ? <span className="h-2.5 w-2.5 rounded-full bg-brand-light" /> : null}
      </span>

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
    </button>
  );
}

export default function PrimaryConcernStep() {
  const [selectedConcern, setSelectedConcern] = useState<PrimaryConcern | null>(null);
  const [otherDescription, setOtherDescription] = useState("");

  return (
    <div>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
          Primary Concern
        </p>
        <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What is your main skin concern right now?
        </h1>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {primaryConcernOptions.map((option) => (
          <PrimaryConcernOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedConcern === option.value}
            onSelect={() => setSelectedConcern(option.value)}
          />
        ))}
      </div>

      {selectedConcern === "other" ? (
        <div className="mt-4 sm:mt-5">
          <label htmlFor="other-concern" className="sr-only">
            Describe your concern
          </label>
          <textarea
            id="other-concern"
            name="otherConcern"
            rows={3}
            placeholder="Describe your main skin concern"
            value={otherDescription}
            onChange={(event) => setOtherDescription(event.target.value)}
            className={`${inputClassName} resize-none`}
          />
        </div>
      ) : null}

      <p className="mt-5 text-sm leading-relaxed text-brand-gray sm:mt-6 sm:text-[0.9375rem]">
        Select your top concern. You can describe secondary concerns in a later step.
      </p>
    </div>
  );
}
