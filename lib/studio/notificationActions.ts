"use server";

import type { StudioNotificationType } from "@/lib/supabase/database.types";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireStudioMember } from "@/lib/studio/member";

export async function markStudioNotificationsRead(ids: string[]) {
  const { user, member } = await requireStudioMember();
  if (!user || !member || ids.length === 0) return;

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("studio_notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", user.id)
    .is("read_at", null)
    .in("id", ids);

  if (error) {
    console.error("[markStudioNotificationsRead]", error.message);
  }
}

export async function markAllStudioNotificationsRead(
  type?: StudioNotificationType,
) {
  const { user, member } = await requireStudioMember();
  if (!user || !member) return;

  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("studio_notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", user.id)
    .is("read_at", null);

  if (type) {
    query = query.eq("type", type);
  }

  const { error } = await query;
  if (error) {
    console.error("[markAllStudioNotificationsRead]", error.message);
  }
}
