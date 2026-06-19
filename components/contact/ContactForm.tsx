"use client";

import { FormEvent, useState } from "react";
import FillButton from "@/components/ui/FillButton";
import {
  buildContactFormPayload,
  submitContactForm,
} from "@/lib/contact/submitContactForm";
import type { ContactFormPayload } from "@/types/contact";

const inputClassName =
  "w-full rounded-xl border border-brand-border-light bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-brand-gray/50 focus:border-brand-light sm:text-[15px]";

const labelClassName = "mb-2 block text-sm text-brand-gray sm:text-[15px]";

type SubmitState =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type ContactField = keyof ContactFormPayload;

const requiredFields: ContactField[] = [
  "firstName",
  "lastName",
  "company",
  "workEmail",
  "phone",
  "country",
  "message",
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>(
    {},
  );

  const clearFieldError = (field: ContactField) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validatePayload = (payload: ContactFormPayload) => {
    const errors: Partial<Record<ContactField, string>> = {};

    for (const field of requiredFields) {
      if (!payload[field]) {
        errors[field] = "This field is required.";
      }
    }

    if (payload.workEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.workEmail)) {
      errors.workEmail = "Please enter a valid email address.";
    }

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = buildContactFormPayload(new FormData(form));
    const validationErrors = validatePayload(payload);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSubmitState({
        type: "error",
        message: "Please fill all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setSubmitState({ type: "idle" });

    try {
      const result = await submitContactForm(payload);

      if (result.ok) {
        setSubmitState({
          type: "success",
          message: "Form submitted successfully.",
        });
        form.reset();
        return;
      }

      if (result.reason === "validation") {
        setSubmitState({
          type: "error",
          message: "Please add a valid work email and a short message.",
        });
        return;
      }

      setSubmitState({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } catch {
      setSubmitState({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            required
            aria-invalid={Boolean(fieldErrors.firstName)}
            aria-describedby={fieldErrors.firstName ? "first-name-error" : undefined}
            onChange={() => clearFieldError("firstName")}
            className={inputClassName}
          />
          {fieldErrors.firstName ? (
            <p id="first-name-error" className="mt-1 text-xs text-red-600 sm:text-sm">
              {fieldErrors.firstName}
            </p>
          ) : null}
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
            required
            aria-invalid={Boolean(fieldErrors.lastName)}
            aria-describedby={fieldErrors.lastName ? "last-name-error" : undefined}
            onChange={() => clearFieldError("lastName")}
            className={inputClassName}
          />
          {fieldErrors.lastName ? (
            <p id="last-name-error" className="mt-1 text-xs text-red-600 sm:text-sm">
              {fieldErrors.lastName}
            </p>
          ) : null}
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
            required
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "company-error" : undefined}
            onChange={() => clearFieldError("company")}
            className={inputClassName}
          />
          {fieldErrors.company ? (
            <p id="company-error" className="mt-1 text-xs text-red-600 sm:text-sm">
              {fieldErrors.company}
            </p>
          ) : null}
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
            required
            aria-invalid={Boolean(fieldErrors.workEmail)}
            aria-describedby={fieldErrors.workEmail ? "work-email-error" : undefined}
            onChange={() => clearFieldError("workEmail")}
            className={inputClassName}
          />
          {fieldErrors.workEmail ? (
            <p id="work-email-error" className="mt-1 text-xs text-red-600 sm:text-sm">
              {fieldErrors.workEmail}
            </p>
          ) : null}
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
            required
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            onChange={() => clearFieldError("phone")}
            className={inputClassName}
          />
          {fieldErrors.phone ? (
            <p id="phone-error" className="mt-1 text-xs text-red-600 sm:text-sm">
              {fieldErrors.phone}
            </p>
          ) : null}
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
            required
            aria-invalid={Boolean(fieldErrors.country)}
            aria-describedby={fieldErrors.country ? "country-error" : undefined}
            onChange={() => clearFieldError("country")}
            className={inputClassName}
          />
          {fieldErrors.country ? (
            <p id="country-error" className="mt-1 text-xs text-red-600 sm:text-sm">
              {fieldErrors.country}
            </p>
          ) : null}
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
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          onChange={() => clearFieldError("message")}
          className={`${inputClassName} min-h-[9rem] resize-y`}
        />
        {fieldErrors.message ? (
          <p id="message-error" className="mt-1 text-xs text-red-600 sm:text-sm">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex justify-end pt-4 sm:pt-5">
        <FillButton
          type="submit"
          variant="subscribe"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="px-8 py-3.5 text-sm sm:px-10 sm:py-4 sm:text-base"
        >
          {isSubmitting ? "Sending..." : "Get in touch"}
        </FillButton>
      </div>

      <div className="mt-3 min-h-[1.25rem] text-right">
        {submitState.type === "success" ? (
          <p role="status" aria-live="polite" className="text-xs text-green-600 sm:text-sm">
            {submitState.message}
          </p>
        ) : null}

        {submitState.type === "error" ? (
          <p role="alert" className="text-xs text-brand-ink sm:text-sm">
            {submitState.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
