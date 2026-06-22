"use client";

import { useState } from "react";

export default function EventDateStep() {
  const [eventDate, setEventDate] = useState("");

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          When is your event?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          We will keep this important event in mind for your journey
        </p>
      </header>

      <div className="mt-6 sm:mt-7">
        <label htmlFor="event-date" className="sr-only">
          Event date
        </label>
        <input
          id="event-date"
          name="eventDate"
          type="text"
          inputMode="numeric"
          placeholder="MM/DD/YYYY"
          value={eventDate}
          onChange={(event) => setEventDate(event.target.value)}
          className="w-full rounded-2xl border border-brand-light/80 bg-white px-4 py-4 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/50 focus:border-brand-light sm:px-5 sm:py-[1.125rem] sm:text-[0.9375rem]"
        />
      </div>
    </div>
  );
}
