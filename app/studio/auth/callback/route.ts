import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const authError = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const next = searchParams.get("next") ?? "/studio";
  const safeNext =
    next.startsWith("/studio") && !next.startsWith("//") ? next : "/studio";

  if (authError || errorCode) {
    const loginError =
      errorCode === "otp_expired" || authError === "access_denied"
        ? "expired"
        : "auth";
    return NextResponse.redirect(
      `${origin}/studio/login?error=${loginError}`,
    );
  }

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  const tokenHash = searchParams.get("token_hash");
  const otpType = searchParams.get("type");
  if (tokenHash && otpType) {
    const supabase = await createServerSupabaseClient();
    const type =
      otpType === "magiclink" || otpType === "recovery" || otpType === "email"
        ? otpType
        : "invite";
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    return NextResponse.redirect(`${origin}/studio/login?error=expired`);
  }

  return NextResponse.redirect(`${origin}/studio/login?error=auth`);
}
