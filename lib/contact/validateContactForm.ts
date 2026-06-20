import type { ContactFormPayload } from "@/types/contact";

export type ContactField = keyof ContactFormPayload;

export const CONTACT_FIELD_LABELS: Record<ContactField, string> = {
  firstName: "First name",
  lastName: "Last name",
  company: "Company",
  workEmail: "Work email",
  phone: "Phone",
  country: "Country",
  message: "Message",
};

export const CONTACT_FORM_ERRORS = {
  invalidEmail: "Please enter a valid email address.",
} as const;

export function getRequiredFieldError(field: ContactField) {
  return `${CONTACT_FIELD_LABELS[field]} is required.`;
}

export const CONTACT_REQUIRED_FIELDS: ContactField[] = [
  "firstName",
  "lastName",
  "company",
  "workEmail",
  "phone",
  "country",
  "message",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  payload: ContactFormPayload,
): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};

  for (const field of CONTACT_REQUIRED_FIELDS) {
    if (!payload[field]) {
      errors[field] = getRequiredFieldError(field);
    }
  }

  if (payload.workEmail && !emailPattern.test(payload.workEmail)) {
    errors.workEmail = CONTACT_FORM_ERRORS.invalidEmail;
  }

  return errors;
}

export function isContactFormComplete(payload: ContactFormPayload) {
  return Object.keys(validateContactForm(payload)).length === 0;
}

export function getFirstInvalidContactField(
  errors: Partial<Record<ContactField, string>>,
  fieldOrder: ContactField[] = CONTACT_REQUIRED_FIELDS,
) {
  return fieldOrder.find((field) => Boolean(errors[field]));
}
