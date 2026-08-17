"use client";

import { useEffect } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

function loginErrorFromHash(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const error = params.get("error");
  const errorCode = params.get("error_code");
  if (!error && !errorCode) return null;
  if (errorCode === "otp_expired" || error === "access_denied") {
    return "expired";
  }
  return "auth";
}

/**
 * Invite/recovery links may land with hash tokens or hash errors.
 * Hash is never sent to the server, so this client handler finishes the flow.
 */
export default function StudioAuthHashHandler() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    const finish = async () => {
      const supabase = createBrowserSupabaseClient();

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!error) {
          window.location.replace("/studio/set-password");
          return;
        }
      }

      const errorCode = loginErrorFromHash(hash);
      if (!errorCode) return;

      try {
        await supabase.auth.signOut();
      } catch {
        // Still send them to login even if sign-out fails.
      }
      const url = new URL("/studio/login", window.location.origin);
      url.searchParams.set("error", errorCode);
      window.location.replace(url.toString());
    };

    void finish();
  }, []);

  return null;
}
