"use client";

import Image from "next/image";
import { useState } from "react";

const inputClassName =
  "w-full rounded-2xl border border-brand-border-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[15px]";

const environmentStats = [
  {
    label: "UV index",
    value: "12",
    icon: "/svgs/afternoon_11930102 2.svg",
  },
  {
    label: "Humidity",
    value: "7%",
    icon: "/svgs/Group (6).svg",
  },
  {
    label: "pollution",
    value: "80%",
  },
] as const;

function PollutionIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-7 w-7 text-brand-light sm:h-8 sm:w-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 20H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 20V12H10V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 20V8H16V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 20V14H20V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 8C8 6.5 9 5 10.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 4C14 2.5 15 1 16.5 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EnvironmentStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <span className="flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9">
        {icon ? (
          <Image
            src={icon}
            alt=""
            width={36}
            height={36}
            className="h-7 w-auto object-contain sm:h-8"
          />
        ) : (
          <PollutionIcon />
        )}
      </span>
      <span className="mt-2 text-[11px] capitalize text-brand-gray sm:text-xs">
        {label}
      </span>
      <span className="mt-0.5 text-sm font-semibold text-brand-ink sm:text-[0.9375rem]">
        {value}
      </span>
    </div>
  );
}

export default function LocationStep() {
  const [location, setLocation] = useState("");

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          I live in.....
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Your local climate, air quality, and sun exposure impact your skin. We
          use location to tailor our recommendations
        </p>
      </header>

      <div className="mt-6 sm:mt-7">
        <label htmlFor="location" className="sr-only">
          City, Country
        </label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="City, Country"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-2 sm:mt-7 sm:gap-3">
        {environmentStats.map((stat) => (
          <EnvironmentStat
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={"icon" in stat ? stat.icon : undefined}
          />
        ))}
      </div>
    </div>
  );
}
