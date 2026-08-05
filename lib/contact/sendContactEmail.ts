import {
  escapeHtml,
  getResendConfig,
  isContactResendConfigured,
} from "@/lib/email/resendClient";
import type { ContactFormPayload } from "@/types/contact";

export { isContactResendConfigured as isResendConfigured };

/**
 * Send contact-form emails via Resend:
 * 1) notify the company inbox
 * 2) thank the visitor (message received, reply soon)
 *
 * Each send is independent so one failure does not block the other.
 */
export async function sendContactEmail(
  payload: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const config = getResendConfig();
  if (!config?.companyTo) {
    return { ok: false, message: "Resend is not configured." };
  }

  const { resend, from, companyTo } = config;
  const safeName = escapeHtml(payload.firstName);
  const safeEmail = escapeHtml(payload.workEmail);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  const errors: string[] = [];

  const companyResult = await resend.emails.send({
    from,
    to: [companyTo],
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

  if (companyResult.error) {
    console.error("[sendContactEmail] company", companyResult.error);
    errors.push(`company: ${companyResult.error.message}`);
  }

  const userResult = await resend.emails.send({
    from,
    to: [payload.workEmail],
    subject: "Thanks — we received your message | GlamRepairs",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b2b2b;">
        <h2 style="color: #662d91; margin-bottom: 8px;">Thank you, ${safeName}!</h2>
        <p>Your message has been received.</p>
        <p><strong>Bohat jald reply aayega.</strong> Our team will get back to you soon.</p>
        <p style="margin-top: 20px; color: #4a4a4a;">— GlamRepairs</p>
      </div>
    `,
    text: [
      `Thank you, ${payload.firstName}!`,
      "",
      "Your message has been received.",
      "Bohat jald reply aayega. Our team will get back to you soon.",
      "",
      "— GlamRepairs",
    ].join("\n"),
  });

  if (userResult.error) {
    console.error("[sendContactEmail] user thank-you", userResult.error);
    errors.push(`user: ${userResult.error.message}`);
  }

  if (errors.length > 0) {
    return { ok: false, message: errors.join(" | ") };
  }

  return { ok: true };
}
