"use client";

import { StepBody, StepHeader } from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

function toLocalISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EventDateStep() {
  const [eventDate, setEventDate] = useStepAnswer<string>(
    "booking.eventDate",
    "",
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = toLocalISODate(tomorrow);

  const isFuture = eventDate !== "" && eventDate >= minDate;
  useStepGate(isFuture);

  const showError = eventDate !== "" && !isFuture;

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
          type="date"
          min={minDate}
          value={eventDate}
          onChange={(event) => setEventDate(event.target.value)}
          className="w-full rounded-2xl border border-brand-light/80 bg-white px-4 py-4 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/50 focus:border-brand-light sm:px-5 sm:py-[1.125rem] sm:text-[0.9375rem]"
        />

        {showError ? (
          <p className="mt-2 text-xs text-red-500 sm:text-[0.8125rem]">
            Please choose a future date.
          </p>
        ) : null}
      </StepBody>
    </div>
  );
}
