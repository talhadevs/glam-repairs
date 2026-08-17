import { sanitizeLeadAnswers } from "@/lib/leads/sanitizeLeadAnswers";
import type { LeadSubmitPayload } from "@/types/lead";

const PHOTO_TTL_DAYS = 30;

export type InsertLeadInput = LeadSubmitPayload & {
  imageUrls: string[];
  photoPaths: string[];
};

export type InsertLeadResult = {
  leadId: string;
  photosExpireAt: string | null;
};

/**
 * Insert a durable lead row. Photo files expire later; this row stays.
 */
export async function insertLead(
  input: InsertLeadInput,
): Promise<InsertLeadResult | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return null;

  const photosExpireAt =
    input.photoPaths.length > 0
      ? new Date(Date.now() + PHOTO_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString()
      : null;

  const row = {
    session_id: input.sessionId,
    full_name: input.fullName ?? null,
    email: input.email ?? null,
    selected_plan: input.selectedPlan ?? null,
    plan_name: input.planName ?? null,
    plan_price: input.planPrice ?? null,
    answers: sanitizeLeadAnswers(input.answers),
    image_urls: input.imageUrls,
    photo_paths: input.photoPaths,
    photos_expire_at: photosExpireAt,
    photos_deleted_at: null,
    status: "new",
    source: "funnel",
    payment_status: "pending",
  };

  const response = await fetch(`${base}/rest/v1/leads?select=id,photos_expire_at`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[insertLead] Failed:", response.status, detail);
    return null;
  }

  const rows = (await response.json()) as Array<{
    id: string;
    photos_expire_at: string | null;
  }>;

  const lead = rows[0];
  if (!lead) return null;

  return {
    leadId: lead.id,
    photosExpireAt: lead.photos_expire_at,
  };
}
