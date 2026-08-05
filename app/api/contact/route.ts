import { NextResponse } from "next/server";

import { insertContactMessage } from "@/lib/contact/insertContactMessage";
import { sendContactEmail } from "@/lib/contact/sendContactEmail";
import { isContactResendConfigured } from "@/lib/email/resendClient";
import type { ContactFormPayload, ContactSubmitResult } from "@/types/contact";

function isSupabaseConfigured() {
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
 * Save contact form submissions to Supabase.
 * Resend email is optional (after domain verify).
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

  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[api/contact] Payload ready for Supabase", payload);
      if (isContactResendConfigured()) {
        const emailResult = await sendContactEmail(payload);
        if (!emailResult.ok) {
          console.error(
            "[api/contact] Local contact email failed:",
            emailResult.message,
          );
        }
      }
      return NextResponse.json<ContactSubmitResult>({ ok: true });
    }

    return NextResponse.json<ContactSubmitResult>(
      { ok: false, reason: "unknown" },
      { status: 503 },
    );
  }

  const saved = await insertContactMessage(payload);
  if (!saved) {
    return NextResponse.json<ContactSubmitResult>(
      { ok: false, reason: "unknown" },
      { status: 502 },
    );
  }

  // Company inbox + user thank-you (requires Resend env vars).
  if (isContactResendConfigured()) {
    const emailResult = await sendContactEmail(payload);
    if (!emailResult.ok) {
      console.error(
        "[api/contact] Saved to Supabase but email failed:",
        emailResult.message,
      );
    }
  }

  return NextResponse.json<ContactSubmitResult>({ ok: true });
}
