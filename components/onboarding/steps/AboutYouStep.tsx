"use client";

import { useState } from "react";

const inputClassName =
  "w-full rounded-2xl border border-brand-border-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[15px]";

type ContactMethod = "whatsapp" | "email";

function ContactOption({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: ContactMethod;
  selected: boolean;
  onSelect: (value: ContactMethod) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex items-center gap-2.5 rounded-full px-3 py-1.5 transition-colors ${
        selected ? "bg-brand-light text-white" : "text-brand-gray/70"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${
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
      <span className="text-sm sm:text-[15px]">{label}</span>
    </button>
  );
}

export default function AboutYouStep() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("whatsapp");

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          About you
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]">
          Hormones have a big impact on how our skin looks and feels at every
          age
        </p>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          autoComplete="name"
          className={inputClassName}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          autoComplete="email"
          className={inputClassName}
        />
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          autoComplete="address-level2"
          className={inputClassName}
        />
      </div>

      <div className="mt-7 sm:mt-8">
        <h2 className="font-serif text-xl text-brand-ink sm:text-[1.35rem]">
          Preferred contact method
        </h2>
        <div className="mt-4 flex items-center gap-8 sm:mt-5 sm:gap-10">
          <ContactOption
            label="Whatsapp"
            value="whatsapp"
            selected={contactMethod === "whatsapp"}
            onSelect={setContactMethod}
          />
          <ContactOption
            label="Email"
            value="email"
            selected={contactMethod === "email"}
            onSelect={setContactMethod}
          />
        </div>
      </div>
    </div>
  );
}
