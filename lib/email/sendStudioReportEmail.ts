import { escapeHtml, getResendConfig } from "@/lib/email/resendClient";

export type StudioReportEmailPayload = {
  toEmail: string;
  customerName?: string | null;
  pdf: Buffer;
  fileName: string;
};

export async function sendStudioReportEmail(
  payload: StudioReportEmailPayload,
): Promise<
  { ok: true; resendId: string | null } | { ok: false; message: string }
> {
  const config = getResendConfig();
  const toEmail = payload.toEmail.trim();

  if (!config) {
    return { ok: false, message: "Email is not configured." };
  }
  if (!toEmail.includes("@")) {
    return { ok: false, message: "A valid customer email is required." };
  }

  const name =
    payload.customerName?.trim() || toEmail.split("@")[0] || "there";
  const safeName = escapeHtml(name);

  const { resend, from } = config;
  const { data, error } = await resend.emails.send({
    from,
    to: [toEmail],
    subject: "Your skin guidance report | GlamRepairs",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.65; color: #2b2b2b; max-width: 560px;">
        <p style="margin: 0 0 12px;">Hi ${safeName},</p>
        <p style="margin: 0 0 12px;">
          Your personalized skin guidance report from the GlamRepairs team is attached as a PDF.
        </p>
        <p style="margin: 0 0 12px;">
          Please read it carefully and follow the morning and night routine as written. If anything feels irritating, pause and message us.
        </p>
        <p style="margin: 24px 0 0; color: #4a4a4a;">
          Warm regards,<br />
          <strong style="color: #662d91;">The GlamRepairs Team</strong>
        </p>
      </div>
    `,
    text: [
      `Hi ${name},`,
      "",
      "Your personalized skin guidance report from the GlamRepairs team is attached as a PDF.",
      "Please read it carefully and follow the morning and night routine as written. If anything feels irritating, pause and message us.",
      "",
      "Warm regards,",
      "The GlamRepairs Team",
    ].join("\n"),
    attachments: [
      {
        filename: payload.fileName,
        content: payload.pdf.toString("base64"),
      },
    ],
  });

  if (error) {
    console.error("[sendStudioReportEmail]", error);
    return { ok: false, message: error.message };
  }

  return { ok: true, resendId: data?.id ?? null };
}
