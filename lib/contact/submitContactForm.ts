import type { ContactFormPayload, ContactSubmitResult } from "@/types/contact";

function readString(formData: FormData, key: keyof ContactFormPayload) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function buildContactFormPayload(formData: FormData): ContactFormPayload {
  return {
    firstName: readString(formData, "firstName"),
    workEmail: readString(formData, "workEmail"),
    message: readString(formData, "message"),
  };
}

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ContactSubmitResult> {
  try {
    if (!payload.workEmail || !payload.workEmail.includes("@") || !payload.message) {
      return { ok: false, reason: "validation" };
    }

    // Placeholder for future backend integration.
    if (process.env.NODE_ENV !== "production") {
      console.info("[ContactForm] Ready payload", payload);
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "unknown" };
  }
}
