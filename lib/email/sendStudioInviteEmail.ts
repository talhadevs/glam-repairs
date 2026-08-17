import { escapeHtml, getResendConfig } from "@/lib/email/resendClient";

export async function sendStudioInviteEmail(input: {
  toEmail: string;
  displayName: string;
  inviteUrl: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const config = getResendConfig();
  if (!config) {
    return { ok: false, message: "Email is not configured." };
  }

  const name = input.displayName.trim() || "there";
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(input.inviteUrl);

  const { error } = await config.resend.emails.send({
    from: config.from,
    to: [input.toEmail],
    subject: "You're invited to GlamRepairs Studio",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.65; color: #2b2b2b; max-width: 560px;">
        <h2 style="color: #662d91; margin: 0 0 12px; font-size: 22px;">Hi ${safeName},</h2>
        <p style="margin: 0 0 12px;">
          You have been invited to the <strong>GlamRepairs Studio</strong> team.
        </p>
        <p style="margin: 0 0 20px;">
          Open the invite page, then click <strong>Accept invite</strong> to set your password.
          This keeps the link from expiring when your inbox scans it.
        </p>
        <p style="margin: 0 0 24px;">
          <a href="${safeUrl}" style="display: inline-block; background: #662d91; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 999px; font-weight: 600;">
            Open invite
          </a>
        </p>
        <p style="margin: 0; color: #4a4a4a; font-size: 13px;">
          If the button does not work, copy this link:<br />
          ${safeUrl}
        </p>
      </div>
    `,
    text: [
      `Hi ${name},`,
      "",
      "You have been invited to the GlamRepairs Studio team.",
      "Open this page, then click Accept invite to set your password:",
      input.inviteUrl,
      "",
      "The GlamRepairs Team",
    ].join("\n"),
  });

  if (error) {
    console.error("[sendStudioInviteEmail]", error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
