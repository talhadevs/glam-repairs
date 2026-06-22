"use client";

import Image from "next/image";
import { useState } from "react";

type ImproveArea =
  | "whole-face"
  | "eyes"
  | "cheeks"
  | "under-nose"
  | "chin";

const areaOptions: {
  value: ImproveArea;
  label: string;
  icon: string;
}[] = [
  {
    value: "whole-face",
    label: "whole face",
    icon: "/svgs/Group 2085660829.svg",
  },
  {
    value: "eyes",
    label: "Eyes",
    icon: "/svgs/Vector (10).svg",
  },
  {
    value: "cheeks",
    label: "Cheeks",
    icon: "/svgs/Group (5).svg",
  },
  {
    value: "under-nose",
    label: "Under nose",
    icon: "/svgs/Group 2085660827.svg",
  },
  {
    value: "chin",
    label: "Chin",
    icon: "/svgs/Group 2085660901.svg",
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
    <span className="h-5 w-5 shrink-0 rounded-full border border-brand-border-light bg-white" />
  );
}

function AreaOptionCard({
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
      className={`flex w-full items-center gap-2.5 rounded-2xl border bg-white px-3 py-2.5 text-left shadow-sm transition-colors sm:gap-3 sm:px-3.5 sm:py-3 ${
        selected
          ? "border-brand-light ring-1 ring-brand-light"
          : "border-brand-border-light/60 hover:border-brand-lavender"
      }`}
    >
      <SelectionIndicator selected={selected} />
      <span className="flex h-5 w-5 shrink-0 items-center justify-center sm:h-[1.35rem] sm:w-[1.35rem]">
        <Image
          src={icon}
          alt=""
          width={21}
          height={21}
          className="h-5 w-auto object-contain"
        />
      </span>
      <span className="text-sm text-brand-ink sm:text-[0.9375rem]">{label}</span>
    </button>
  );
}

export default function ImproveAreasStep() {
  const [selectedArea, setSelectedArea] = useState<ImproveArea>("whole-face");

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.35rem] leading-snug text-brand-ink sm:text-[1.5rem]">
          What areas would you like to improve?
        </h1>
      </header>

      <div className="relative mt-5 grid grid-cols-[0.85fr_1.15fr] items-stretch gap-3 sm:mt-6 sm:gap-4">
        <div className="relative w-full overflow-hidden rounded-2xl">
          <Image
            src="/svgs/women.svg"
            alt="Face analysis preview"
            width={234}
            height={635}
            priority
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 38vw, 160px"
          />
        </div>

        <div className="relative flex flex-col justify-center space-y-2 sm:space-y-2.5">
          {selectedArea === "whole-face" ? (
            <svg
              aria-hidden
              className="pointer-events-none absolute -left-7 top-1/2 hidden h-[72%] w-7 -translate-y-1/2 sm:block"
              viewBox="0 0 28 220"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M26 18 C 14 28, 10 72, 8 118 C 6 154, 4 188, 2 214"
                stroke="#662D91"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : null}

          {areaOptions.map((option) => (
            <AreaOptionCard
              key={option.value}
              label={option.label}
              icon={option.icon}
              selected={selectedArea === option.value}
              onSelect={() => setSelectedArea(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
