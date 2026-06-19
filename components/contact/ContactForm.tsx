"use client";

import { FormEvent } from "react";
import FillButton from "@/components/ui/FillButton";

const inputClassName =
  "w-full rounded-xl border border-brand-border-light bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-brand-gray/50 focus:border-brand-light sm:text-[15px]";

const labelClassName = "mb-2 block text-sm text-brand-gray sm:text-[15px]";

export default function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
        <div>
          <label htmlFor="first-name" className={labelClassName}>
            First name
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="last-name" className={labelClassName}>
            Last name
          </label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClassName}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="work-email" className={labelClassName}>
            Work email
          </label>
          <input
            id="work-email"
            name="workEmail"
            type="email"
            autoComplete="email"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClassName}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="country" className={labelClassName}>
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${inputClassName} min-h-[9rem] resize-y`}
        />
      </div>

      <div className="mt-5 flex justify-end pt-4 sm:pt-5">
        <FillButton
          type="submit"
          variant="subscribe"
          className="px-8 py-3.5 text-sm sm:px-10 sm:py-4 sm:text-base"
        >
          Get in touch
        </FillButton>
      </div>
    </form>
  );
}
