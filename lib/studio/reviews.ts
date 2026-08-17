import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ReviewDecision } from "@/lib/supabase/database.types";

export type StudioReview = {
  id: string;
  leadId: string;
  createdBy: string;
  authorName: string;
  decision: ReviewDecision;
  findings: string;
  noticed: string | null;
  morningRoutine: string | null;
  nightRoutine: string | null;
  avoidItems: string | null;
  extraNotes: string | null;
  createdAt: string;
};

export async function listCustomerReviews(leadId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_reviews")
    .select(
      "id, lead_id, created_by, author_name, decision, findings, noticed, morning_routine, night_routine, avoid_items, extra_notes, created_at",
    )
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[listCustomerReviews]", error.message);
    return [];
  }

  return (data ?? []).map(
    (row) =>
      ({
        id: row.id,
        leadId: row.lead_id,
        createdBy: row.created_by,
        authorName: row.author_name,
        decision: row.decision,
        findings: row.findings,
        noticed: row.noticed,
        morningRoutine: row.morning_routine,
        nightRoutine: row.night_routine,
        avoidItems: row.avoid_items,
        extraNotes: row.extra_notes,
        createdAt: row.created_at,
      }) satisfies StudioReview,
  );
}

export function reviewToReportDefaults(review: StudioReview | null) {
  if (!review) {
    return {
      noticed: "",
      morningRoutine: "",
      nightRoutine: "",
      avoidItems: "",
      extraNotes: "",
    };
  }

  return {
    noticed: review.noticed?.trim() || review.findings,
    morningRoutine: review.morningRoutine ?? "",
    nightRoutine: review.nightRoutine ?? "",
    avoidItems: review.avoidItems ?? "",
    extraNotes: review.extraNotes ?? "",
  };
}
