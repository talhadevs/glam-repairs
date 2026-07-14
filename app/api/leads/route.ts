import { NextResponse } from "next/server";

import type { LeadSubmitPayload, LeadSubmitResult } from "@/types/lead";

function isConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function validatePayload(body: unknown): body is LeadSubmitPayload {
  if (!body || typeof body !== "object") return false;
  const payload = body as LeadSubmitPayload;
  return typeof payload.sessionId === "string" && payload.sessionId.length > 0;
}

/**
 * Persist a funnel lead + selfie.
 *
 * Supabase wiring (do later):
 * 1. Create a private/public Storage bucket, e.g. `selfies`
 * 2. Create a `leads` table with columns for session_id, name, email, plan, image_url, answers (jsonb)
 * 3. Decode `selfieDataUrl`, upload to Storage, get public URL
 * 4. Insert the lead row and return `{ ok: true, leadId, imageUrl }`
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<LeadSubmitResult>(
      { ok: false, reason: "validation", message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!validatePayload(body)) {
    return NextResponse.json<LeadSubmitResult>(
      {
        ok: false,
        reason: "validation",
        message: "sessionId is required.",
      },
      { status: 400 },
    );
  }

  if (!isConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[api/leads] Payload ready for Supabase", {
        sessionId: body.sessionId,
        fullName: body.fullName,
        email: body.email,
        selectedPlan: body.selectedPlan,
        planName: body.planName,
        hasSelfie: Boolean(body.selfieDataUrl),
        answerKeys: body.answers ? Object.keys(body.answers) : [],
      });
    }

    // App keeps working before Supabase is connected; WhatsApp opens without image URL.
    return NextResponse.json<LeadSubmitResult>({
      ok: true,
      leadId: `local_${body.sessionId.slice(0, 8)}`,
      imageUrl: null,
    });
  }

  // TODO: Replace with Supabase Storage upload + leads insert.
  // Example shape once wired:
  // const imageUrl = await uploadSelfie(body.sessionId, body.selfieDataUrl);
  // const lead = await insertLead({ ...body, imageUrl });
  return NextResponse.json<LeadSubmitResult>(
    {
      ok: false,
      reason: "not_configured",
      message:
        "Supabase env vars are set, but upload/insert is not implemented yet.",
    },
    { status: 501 },
  );
}
