import { escapeHtml, getResendConfig } from "@/lib/email/resendClient";

export type PlanThankYouPayload = {
  fullName?: string | null;
  email?: string | null;
  planName?: string | null;
  planPrice?: string | null;
  selectedPlan?: string | null;
};

/**
 * Thank the user after they complete the funnel and select a plan.
 */
export async function sendPlanThankYouEmail(
  payload: PlanThankYouPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const config = getResendConfig();
  const email = payload.email?.trim();

  if (!config || !email || !email.includes("@")) {
    return { ok: false, message: "Resend is not configured or email is missing." };
  }

  const name =
    payload.fullName?.trim() ||
    email.split("@")[0] ||
    "there";
  const planName =
    payload.planName?.trim() ||
    (payload.selectedPlan
      ? payload.selectedPlan.charAt(0).toUpperCase() + payload.selectedPlan.slice(1)
      : "your selected");
  const planPrice = payload.planPrice?.trim();

  const safeName = escapeHtml(name);
  const safePlan = escapeHtml(planName);
  const safePrice = planPrice ? escapeHtml(planPrice) : null;
  const planLine = safePrice
    ? `<strong>${safePlan}</strong> (${safePrice})`
    : `<strong>${safePlan}</strong>`;
  const planLineText = planPrice
    ? `${planName} (${planPrice})`
    : planName;

  const { resend, from } = config;

  const { error } = await resend.emails.send({
    from,
    to: [email],
    subject: `Your ${planName} plan is confirmed | GlamRepairs`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.65; color: #2b2b2b; max-width: 560px;">
        <h2 style="color: #662d91; margin: 0 0 12px; font-size: 22px;">Hi ${safeName},</h2>
        <p style="margin: 0 0 12px;">
          Thank you for completing your skin assessment with <strong>GlamRepairs</strong>.
        </p>
        <p style="margin: 0 0 12px;">
          Your selected plan: ${planLine}
        </p>
        <p style="margin: 0 0 12px;">
          Our experts will carefully review your answers and photos, then share
          personalized guidance for your skin journey.
        </p>
        <p style="margin: 0 0 12px;">
          We will be in touch with you soon with the next steps.
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
      "Thank you for completing your skin assessment with GlamRepairs.",
      "",
      `Your selected plan: ${planLineText}`,
      "",
      "Our experts will carefully review your answers and photos, then share personalized guidance for your skin journey.",
      "We will be in touch with you soon with the next steps.",
      "",
      "Warm regards,",
      "The GlamRepairs Team",
    ].join("\n"),
  });

  if (error) {
    console.error("[sendPlanThankYouEmail]", error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
