import type { ContactField } from "@/lib/contact/validateContactForm";

type ContactInputField = {
  name: ContactField;
  id: string;
  label: string;
  type: "text" | "email";
  autoComplete: string;
};

export const contactFormFields: ContactInputField[] = [
  {
    name: "firstName",
    id: "first-name",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "workEmail",
    id: "work-email",
    label: "Email",
    type: "email",
    autoComplete: "email",
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
  workEmail: "work-email",
  message: "message",
};
