import type { ContactFormPayload } from "@/types/contact";

export type InsertContactResult = {
  id: string;
};

/**
 * Persist a contact form submission in Supabase.
 */
export async function insertContactMessage(
  payload: ContactFormPayload,
): Promise<InsertContactResult | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return null;

  const row = {
    first_name: payload.firstName,
    email: payload.workEmail,
    message: payload.message,
  };

  const response = await fetch(
    `${base}/rest/v1/contact_messages?select=id`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[insertContactMessage] Failed:", response.status, detail);
    return null;
  }

  const rows = (await response.json()) as Array<{ id: string }>;
  const message = rows[0];
  if (!message?.id) return null;

  return { id: message.id };
}
