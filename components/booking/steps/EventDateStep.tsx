"use client";

import { useState } from "react";
import { StepBody, StepHeader } from "@/components/steps";

export default function EventDateStep() {
  const [eventDate, setEventDate] = useState("");

  return (
    <div>
      <StepHeader
        title="When is your event?"
        subtitle="We will keep this important event in mind for your journey"
      />

      <StepBody>
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
      </StepBody>
    </div>
  );
}
