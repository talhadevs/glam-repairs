import type { LeadSubmitPayload, LeadSubmitResult } from "@/types/lead";

/**
 * Sends funnel lead + selfie to `/api/leads`.
 * Wire Supabase in that route; this client helper stays unchanged.
 */
export async function submitLead(
  payload: LeadSubmitPayload,
): Promise<LeadSubmitResult> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as LeadSubmitResult;

    if (!response.ok || !data.ok) {
      return data.ok === false
        ? data
        : { ok: false, reason: "unknown", message: "Lead submission failed." };
    }

    return data;
  } catch {
    return { ok: false, reason: "network" };
  }
}
