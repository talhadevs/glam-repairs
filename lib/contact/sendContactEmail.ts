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
