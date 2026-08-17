import { escapeHtml, getResendConfig } from "@/lib/email/resendClient";

export type StudioCustomerEmailPayload = {
  toEmail: string;
  customerName?: string | null;
  subject: string;
  body: string;
};

export async function sendStudioCustomerEmail(
  payload: StudioCustomerEmailPayload,
): Promise<
  { ok: true; resendId: string | null } | { ok: false; message: string }
> {
  const config = getResendConfig();
  const toEmail = payload.toEmail.trim();
  const subject = payload.subject.trim();
  const body = payload.body.trim();

  if (!config) {
    return { ok: false, message: "Email is not configured." };
  }

  if (!toEmail.includes("@") || !subject || !body) {
    return { ok: false, message: "Email, subject, and message are required." };
  }

  const name =
    payload.customerName?.trim() || toEmail.split("@")[0] || "there";
  const safeName = escapeHtml(name);
  const safeBody = escapeHtml(body).replaceAll("\n", "<br />");

  const { resend, from } = config;
  const { data, error } = await resend.emails.send({
    from,
    to: [toEmail],
    subject,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.65; color: #2b2b2b; max-width: 560px;">
        <p style="margin: 0 0 12px;">Hi ${safeName},</p>
        <div style="margin: 0 0 16px;">${safeBody}</div>
        <p style="margin: 24px 0 0; color: #4a4a4a;">
          Warm regards,<br />
          <strong style="color: #662d91;">The GlamRepairs Team</strong>
        </p>
      </div>
    `,
    text: [`Hi ${name},`, "", body, "", "Warm regards,", "The GlamRepairs Team"].join(
      "\n",
    ),
  });

  if (error) {
    console.error("[sendStudioCustomerEmail]", error);
    return { ok: false, message: error.message };
  }

  return { ok: true, resendId: data?.id ?? null };
}
