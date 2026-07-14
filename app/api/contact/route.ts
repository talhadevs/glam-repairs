import { NextResponse } from "next/server";

import type { ContactFormPayload, ContactSubmitResult } from "@/types/contact";

function isConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function readPayload(body: unknown): ContactFormPayload | null {
  if (!body || typeof body !== "object") return null;
  const payload = body as ContactFormPayload;
  if (
    typeof payload.firstName !== "string" ||
    typeof payload.workEmail !== "string" ||
    typeof payload.message !== "string"
  ) {
    return null;
  }
  return {
    firstName: payload.firstName.trim(),
    workEmail: payload.workEmail.trim(),
    message: payload.message.trim(),
  };
}

/**
 * Persist a contact form submission.
 * Wire Supabase `contact_messages` (or similar) insert here later.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ContactSubmitResult>(
      { ok: false, reason: "validation" },
      { status: 400 },
    );
  }

  const payload = readPayload(body);
  if (
    !payload ||
    !payload.firstName ||
    !payload.workEmail.includes("@") ||
    !payload.message
  ) {
    return NextResponse.json<ContactSubmitResult>(
      { ok: false, reason: "validation" },
      { status: 400 },
    );
  }

  if (!isConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[api/contact] Payload ready for Supabase", payload);
    }
    return NextResponse.json<ContactSubmitResult>({ ok: true });
  }

  // TODO: Insert into Supabase contact table.
  return NextResponse.json<ContactSubmitResult>(
    { ok: false, reason: "unknown" },
    { status: 501 },
  );
}
