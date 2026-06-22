"use client";

import Image from "next/image";
import { useState } from "react";

type SpecialEventChoice =
  | "vacation"
  | "wedding"
  | "holiday"
  | "sporting-event"
  | "reunion"
  | "family-occasion"
  | "other"
  | "none";

type EventOption = {
  value: SpecialEventChoice;
  label: string;
  icon?: string;
};

const eventOptions: EventOption[] = [
  { value: "vacation", label: "Vacation", icon: "/svgs/Group (26).svg" },
  { value: "wedding", label: "Wedding", icon: "/svgs/Group 2085660850.svg" },
  { value: "holiday", label: "Holiday", icon: "/svgs/Group 2085660851.svg" },
  {
    value: "sporting-event",
    label: "Sporting event",
    icon: "/svgs/Group 2085660852.svg",
  },
  { value: "reunion", label: "Reunion", icon: "/svgs/Group 2085660918.svg" },
  {
    value: "family-occasion",
    label: "Family occasion",
    icon: "/svgs/Layer_x0020_1 (1).svg",
  },
  { value: "other", label: "Other" },
  {
    value: "none",
    label: "No - just ready to look and feel my best!",
  },
];

function EventOptionCard({
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

export default function SpecialEventStep() {
  const [selectedEvent, setSelectedEvent] = useState<SpecialEventChoice | null>(
    null,
  );

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Do you have a special event coming up?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Having something to look forward to can be a great motivator for
          reaching your goal
        </p>
      </header>

      <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
        {eventOptions.map((option) => (
          <EventOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedEvent === option.value}
            onSelect={() => setSelectedEvent(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
