import {
  escapeHtml,
  getResendConfig,
  isContactResendConfigured,
} from "@/lib/email/resendClient";
import type { ContactFormPayload } from "@/types/contact";

export { isContactResendConfigured as isResendConfigured };

export type ContactEmailResult =
  | {
      ok: true;
      companyEmailId: string | null;
      userEmailId: string | null;
    }
  | { ok: false; message: string };

/**
 * Contact form emails:
 * - Company notification → CONTACT_TO_EMAIL (GlamRepairs inbox)
 * - Thank-you message → visitor email from the form (payload.workEmail)
 */
export async function sendContactEmail(
  payload: ContactFormPayload,
): Promise<ContactEmailResult> {
  const config = getResendConfig();
  if (!config?.companyTo) {
    return { ok: false, message: "Resend is not configured." };
  }

  const { resend, from, companyTo } = config;

  // Always the form visitor — never the company inbox.
  const userEmail = payload.workEmail.trim();
  if (!userEmail.includes("@")) {
    return { ok: false, message: "Visitor email is missing." };
  }

  const safeName = escapeHtml(payload.firstName);
  const safeEmail = escapeHtml(userEmail);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  console.info("[sendContactEmail] destinations", {
    from,
    companyNotificationTo: companyTo,
    userThankYouTo: userEmail,
    fromEnvRaw: process.env.CONTACT_FROM_EMAIL,
  });

  const errors: string[] = [];
  let companyEmailId: string | null = null;
  let userEmailId: string | null = null;

  // 1) Company gets the contact message
  const companyResult = await resend.emails.send({
    from,
    to: [companyTo],
    replyTo: userEmail,
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
      `Email: ${userEmail}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
  });

  if (companyResult.error) {
    console.error("[sendContactEmail] company FAILED", companyResult.error);
    errors.push(`company: ${companyResult.error.message}`);
  } else {
    companyEmailId = companyResult.data?.id ?? null;
    console.info(
      "[sendContactEmail] company notification sent to",
      companyTo,
      companyEmailId,
    );
  }

  // 2) User gets the thank-you (must be form email, not company)
  const userResult = await resend.emails.send({
    from,
    to: [userEmail],
    subject: "We received your message | GlamRepairs",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.65; color: #2b2b2b; max-width: 560px;">
        <h2 style="color: #662d91; margin: 0 0 12px; font-size: 22px;">Hi ${safeName},</h2>
        <p style="margin: 0 0 12px;">
          Thank you for reaching out to <strong>GlamRepairs</strong>.
          We have received your message and our team is reviewing it.
        </p>
        <p style="margin: 0 0 12px;">
          You can expect a reply from us shortly. If your query is urgent,
          feel free to follow up on WhatsApp as well.
        </p>
        <p style="margin: 24px 0 0; color: #4a4a4a;">
          Warm regards,<br />
          <strong style="color: #662d91;">The GlamRepairs Team</strong>
        </p>
      </div>
    `,
    text: [
      `Hi ${payload.firstName},`,
      "",
      "Thank you for reaching out to GlamRepairs.",
      "We have received your message and our team is reviewing it.",
      "",
      "You can expect a reply from us shortly. If your query is urgent, feel free to follow up on WhatsApp as well.",
      "",
      "Warm regards,",
      "The GlamRepairs Team",
    ].join("\n"),
  });

  if (userResult.error) {
    console.error("[sendContactEmail] user thank-you FAILED", userResult.error);
    errors.push(`user: ${userResult.error.message}`);
  } else {
    userEmailId = userResult.data?.id ?? null;
    console.info(
      "[sendContactEmail] thank-you sent to USER",
      userEmail,
      userEmailId,
    );
  }

  if (errors.length > 0) {
    return { ok: false, message: errors.join(" | ") };
  }

  return { ok: true, companyEmailId, userEmailId };
}
