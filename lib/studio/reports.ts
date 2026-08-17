import { createServerSupabaseClient } from "@/lib/supabase/server";

export type StudioReport = {
  id: string;
  leadId: string;
  createdBy: string;
  authorName: string;
  noticed: string;
  morningRoutine: string;
  nightRoutine: string;
  avoidItems: string;
  extraNotes: string | null;
  sentAt: string | null;
  createdAt: string;
};

export async function listCustomerReports(leadId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_reports")
    .select(
      "id, lead_id, created_by, author_name, noticed, morning_routine, night_routine, avoid_items, extra_notes, sent_at, created_at",
    )
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[listCustomerReports]", error.message);
    return [];
  }

  return (data ?? []).map(
    (row) =>
      ({
        id: row.id,
        leadId: row.lead_id,
        createdBy: row.created_by,
        authorName: row.author_name,
        noticed: row.noticed,
        morningRoutine: row.morning_routine,
        nightRoutine: row.night_routine,
        avoidItems: row.avoid_items,
        extraNotes: row.extra_notes,
        sentAt: row.sent_at,
        createdAt: row.created_at,
      }) satisfies StudioReport,
  );
}

export async function getCustomerReport(leadId: string, reportId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_reports")
    .select(
      "id, lead_id, created_by, author_name, noticed, morning_routine, night_routine, avoid_items, extra_notes, sent_at, created_at",
    )
    .eq("lead_id", leadId)
    .eq("id", reportId)
    .maybeSingle();

  if (error) {
    console.error("[getCustomerReport]", error.message);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    leadId: data.lead_id,
    createdBy: data.created_by,
    authorName: data.author_name,
    noticed: data.noticed,
    morningRoutine: data.morning_routine,
    nightRoutine: data.night_routine,
    avoidItems: data.avoid_items,
    extraNotes: data.extra_notes,
    sentAt: data.sent_at,
    createdAt: data.created_at,
  } satisfies StudioReport;
}
