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

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as ContactSubmitResult;
    if (!response.ok || !data.ok) {
      return data.ok === false ? data : { ok: false, reason: "unknown" };
    }

    return data;
  } catch {
    return { ok: false, reason: "network" };
  }
}
