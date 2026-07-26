import { NextResponse } from "next/server";

import { insertLead } from "@/lib/leads/insertLead";
import { uploadAssessmentPhotos } from "@/lib/leads/uploadAssessmentPhotos";
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

function collectPhotoDataUrls(payload: LeadSubmitPayload): string[] {
  const fromList = Array.isArray(payload.photoDataUrls)
    ? payload.photoDataUrls.filter(
        (item): item is string =>
          typeof item === "string" && item.startsWith("data:"),
      )
    : [];

  if (fromList.length > 0) return fromList;

  if (
    typeof payload.selfieDataUrl === "string" &&
    payload.selfieDataUrl.startsWith("data:")
  ) {
    return [payload.selfieDataUrl];
  }

  const answers = payload.answers;
  if (answers && Array.isArray(answers["onboarding.photos"])) {
    return (answers["onboarding.photos"] as unknown[]).filter(
      (item): item is string =>
        typeof item === "string" && item.startsWith("data:"),
    );
  }

  return [];
}

/**
 * Persist funnel lead forever + assessment photos (auto-deleted after 30 days).
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

  const photoDataUrls = collectPhotoDataUrls(body);

  if (!isConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[api/leads] Payload ready for Supabase", {
        sessionId: body.sessionId,
        fullName: body.fullName,
        email: body.email,
        selectedPlan: body.selectedPlan,
        planName: body.planName,
        photoCount: photoDataUrls.length,
        answerKeys: body.answers ? Object.keys(body.answers) : [],
      });
    }

    return NextResponse.json<LeadSubmitResult>({
      ok: true,
      leadId: `local_${body.sessionId.slice(0, 8)}`,
      imageUrl: null,
      imageUrls: [],
    });
  }

  const { imageUrls, photoPaths } = await uploadAssessmentPhotos(
    body.sessionId,
    photoDataUrls,
  );

  const lead = await insertLead({
    ...body,
    imageUrls,
    photoPaths,
  });

  return NextResponse.json<LeadSubmitResult>({
    ok: true,
    leadId: lead?.leadId ?? body.sessionId,
    imageUrl: imageUrls[0] ?? null,
    imageUrls,
  });
}
