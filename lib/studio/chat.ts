import { createServerSupabaseClient } from "@/lib/supabase/server";

export type StudioChatMessage = {
  id: string;
  userId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export async function listStudioMessages() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_messages")
    .select("id, user_id, author_name, body, created_at")
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[listStudioMessages]", error.message);
    return [];
  }

  return (data ?? []).map(
    (row) =>
      ({
        id: row.id,
        userId: row.user_id,
        authorName: row.author_name,
        body: row.body,
        createdAt: row.created_at,
      }) satisfies StudioChatMessage,
  );
}
