import type { ContactField } from "@/lib/contact/validateContactForm";

type ContactInputField = {
  name: ContactField;
  id: string;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
};

export const contactGridFields: ContactInputField[] = [
  {
    name: "firstName",
    id: "first-name",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    id: "last-name",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "company",
    id: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
  },
  {
    name: "workEmail",
    id: "work-email",
    label: "Work email",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    id: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "country",
    id: "country",
    label: "Country",
    type: "text",
    autoComplete: "country-name",
  },
];

export const contactMessageField = {
  name: "message" as const,
  id: "message",
  label: "Message",
  rows: 6,
};

export const contactFieldIds: Record<ContactField, string> = {
  firstName: "first-name",
  lastName: "last-name",
  company: "company",
  workEmail: "work-email",
  phone: "phone",
  country: "country",
  message: "message",
};
