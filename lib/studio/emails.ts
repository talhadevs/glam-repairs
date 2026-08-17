import { createServerSupabaseClient } from "@/lib/supabase/server";

export type StudioEmail = {
  id: string;
  leadId: string;
  sentBy: string;
  toEmail: string;
  subject: string;
  body: string;
  createdAt: string;
};

export async function listCustomerEmails(leadId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_emails")
    .select("id, lead_id, sent_by, to_email, subject, body, created_at")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[listCustomerEmails]", error.message);
    return [];
  }

  return (data ?? []).map(
    (row) =>
      ({
        id: row.id,
        leadId: row.lead_id,
        sentBy: row.sent_by,
        toEmail: row.to_email,
        subject: row.subject,
        body: row.body,
        createdAt: row.created_at,
      }) satisfies StudioEmail,
  );
}
