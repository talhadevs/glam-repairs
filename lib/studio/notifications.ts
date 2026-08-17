import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mapStudioNotification } from "@/lib/studio/notificationTypes";

export type { StudioNotification } from "@/lib/studio/notificationTypes";
export {
  STUDIO_NOTIFICATION_LABELS,
  mapStudioNotification,
} from "@/lib/studio/notificationTypes";

export async function listStudioNotifications(limit = 80) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_notifications")
    .select(
      "id, recipient_id, actor_id, type, title, body, href, lead_id, read_at, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[listStudioNotifications]", error.message);
    return [];
  }

  return (data ?? []).map(mapStudioNotification);
}
