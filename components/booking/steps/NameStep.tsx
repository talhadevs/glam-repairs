"use client";

import { useState } from "react";

export default function NameStep() {
  const [name, setName] = useState("");

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What is your name?
        </h1>
      </header>

      <div className="mt-6 sm:mt-7">
        <label htmlFor="booking-name" className="sr-only">
          Your name
        </label>
        <input
          id="booking-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Write your name here"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-2xl border border-brand-light/80 bg-white px-4 py-4 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:px-5 sm:py-[1.125rem] sm:text-[0.9375rem]"
        />
      </div>
    </div>
  );
}
