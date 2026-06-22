"use client";

import Link from "next/link";
import { useState } from "react";

const inputClassName =
  "w-full rounded-2xl border border-brand-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[0.9375rem]";

function EnvelopeIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 24"
      className="mx-auto h-6 w-8 text-brand-ink sm:h-7 sm:w-9"
      fill="none"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="22"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M1 4.5L16 15.5L31 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KeepResultsStep() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <header className="text-center">
        <EnvelopeIcon />
        <h1 className="mt-4 font-serif text-[1.75rem] leading-tight text-brand-ink sm:mt-5 sm:text-[2rem]">
          Keep your results
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-brand-gray sm:mt-3 sm:text-[0.9375rem]">
          To ensure that the results are saved in your account
        </p>
      </header>

      <div className="mt-6 rounded-2xl border border-brand-border-light/50 bg-white p-4 shadow-sm sm:mt-7 sm:p-5">
        <label htmlFor="results-email" className="sr-only">
          Email address
        </label>
        <input
          id="results-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClassName}
        />

        <p className="mt-4 text-[0.6875rem] leading-relaxed text-brand-gray sm:text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p className="mt-3 text-[0.6875rem] leading-relaxed text-brand-gray sm:text-xs">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>

        <div className="mt-4 flex items-center gap-4 text-[0.6875rem] sm:text-xs">
          <Link
            href="#"
            className="text-brand-light underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-brand-light underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </div>
  );
}
