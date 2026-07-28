import { Resend } from "resend";

import type { ContactFormPayload } from "@/types/contact";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function isResendConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.CONTACT_FROM_EMAIL?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim(),
  );
}

/**
 * Send a contact-form notification to the team inbox via Resend.
 * Reply-To is the visitor email so you can reply directly.
 */
export async function sendContactEmail(
  payload: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return { ok: false, message: "Resend is not configured." };
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(payload.firstName);
  const safeEmail = escapeHtml(payload.workEmail);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.workEmail,
    subject: `Contact form: ${payload.firstName}`,
    html: `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
    text: [
      "New contact message",
      "",
      `Name: ${payload.firstName}`,
      `Email: ${payload.workEmail}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
  });

  if (error) {
    console.error("[sendContactEmail]", error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
