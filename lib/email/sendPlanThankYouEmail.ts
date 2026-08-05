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

  const { resend, from } = config;

  const { error } = await resend.emails.send({
    from,
    to: [email],
    subject: `Thank you for choosing ${planName} | GlamRepairs`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b2b2b;">
        <h2 style="color: #662d91; margin-bottom: 8px;">Thank you, ${safeName}!</h2>
        <p>You have completed your GlamRepairs skin assessment.</p>
        <p>
          <strong>Selected plan:</strong> ${safePlan}
          ${safePrice ? ` (${safePrice})` : ""}
        </p>
        <p>
          Our team will review your details and photos, then guide you on next steps.
          Bohat jald aap se contact kiya jayega.
        </p>
        <p style="margin-top: 20px; color: #4a4a4a;">— GlamRepairs</p>
      </div>
    `,
    text: [
      `Thank you, ${name}!`,
      "",
      "You've completed your GlamRepairs skin assessment.",
      `Selected plan: ${planName}${planPrice ? ` (${planPrice})` : ""}`,
      "",
      "Our team will review your details and photos, then guide you on next steps.",
      "Bohat jald aap se contact kiya jayega.",
      "",
      "— GlamRepairs",
    ].join("\n"),
  });

  if (error) {
    console.error("[sendPlanThankYouEmail]", error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}
