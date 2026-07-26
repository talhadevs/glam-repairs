import { NextResponse } from "next/server";

import { cleanupExpiredPhotos } from "@/lib/leads/cleanupExpiredPhotos";

/**
 * Daily job: remove Storage photos older than 30 days.
 * Lead questionnaire data is kept.
 *
 * Secure with CRON_SECRET:
 * Authorization: Bearer <CRON_SECRET>
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  // Vercel Cron sends Authorization: Bearer <CRON_SECRET> when the env var is set.
  if (process.env.NODE_ENV === "production" && !secret) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET is not configured." },
      { status: 503 },
    );
  }
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const result = await cleanupExpiredPhotos();
  return NextResponse.json({ ok: true, ...result });
}
