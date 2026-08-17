import type { User } from "@supabase/supabase-js";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { StudioRole } from "@/lib/supabase/database.types";

export type StudioMember = {
  userId: string;
  role: StudioRole;
  displayName: string;
  createdAt: string;
};

function getOwnerEmail() {
  return process.env.STUDIO_OWNER_EMAIL?.trim().toLowerCase() ?? "";
}

export async function getStudioUser() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function bootstrapOwnerIfNeeded(user: User) {
  const ownerEmail = getOwnerEmail();
  const userEmail = user.email?.trim().toLowerCase();
  if (!ownerEmail || !userEmail || userEmail !== ownerEmail) {
    return;
  }

  const admin = createAdminSupabaseClient();
  const { count, error: countError } = await admin
    .from("studio_members")
    .select("user_id", { count: "exact", head: true })
    .eq("role", "owner");

  if (countError) {
    console.error("[bootstrapOwnerIfNeeded] count failed:", countError.message);
    return;
  }

  if ((count ?? 0) > 0) return;

  const displayName =
    typeof user.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name.trim()
      : userEmail.split("@")[0] || "Owner";

  const { error } = await admin.from("studio_members").upsert({
    user_id: user.id,
    role: "owner",
    display_name: displayName,
  });

  if (error) {
    console.error("[bootstrapOwnerIfNeeded] insert failed:", error.message);
  }
}

export async function getStudioMember(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_members")
    .select("user_id, role, display_name, created_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[getStudioMember]", error.message);
    return null;
  }

  if (!data) return null;

  return {
    userId: data.user_id,
    role: data.role,
    displayName: data.display_name,
    createdAt: data.created_at,
  } satisfies StudioMember;
}

export async function requireStudioMember() {
  const user = await getStudioUser();
  if (!user) return { user: null, member: null as StudioMember | null };

  await bootstrapOwnerIfNeeded(user);
  const member = await getStudioMember(user.id);
  return { user, member };
}

export async function listStudioMembers() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("studio_members")
    .select("user_id, role, display_name, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[listStudioMembers]", error.message);
    return [];
  }

  return (data ?? []).map(
    (row) =>
      ({
        userId: row.user_id,
        role: row.role,
        displayName: row.display_name,
        createdAt: row.created_at,
      }) satisfies StudioMember,
  );
}
