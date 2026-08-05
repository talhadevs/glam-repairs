import { Resend } from "resend";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Normalize env email values from Vercel/.env.
 * Handles wrapping quotes and "Name <email@domain.com>" formats.
 */
export function normalizeEmailAddress(raw: string | undefined): string | null {
  if (!raw) return null;

  let value = raw.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }

  const named = value.match(/^(.+?)\s*<([^<>\s]+)>$/);
  if (named) {
    const displayName = named[1].trim().replace(/^["']|["']$/g, "");
    const email = named[2].trim();
    if (email.includes("@")) {
      return displayName ? `${displayName} <${email}>` : email;
    }
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return value;
  }

  const extracted = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return extracted?.[0] ?? null;
}

/** Build a From header that shows "GlamRepairs" instead of "hello". */
export function formatFromAddress(raw: string | undefined): string | null {
  const normalized = normalizeEmailAddress(raw);
  if (!normalized) return null;

  const named = normalized.match(/^(.+?)\s*<([^<>\s]+)>$/);
  if (named) {
    return `GlamRepairs <${named[2]}>`;
  }

  return `GlamRepairs <${normalized}>`;
}

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = formatFromAddress(process.env.CONTACT_FROM_EMAIL);
  const companyTo = normalizeEmailAddress(process.env.CONTACT_TO_EMAIL);

  if (!apiKey || !from) {
    return null;
  }

  return {
    resend: new Resend(apiKey),
    from,
    companyTo,
  };
}

export function isResendConfigured() {
  return Boolean(getResendConfig()?.from && process.env.RESEND_API_KEY?.trim());
}

export function isContactResendConfigured() {
  const config = getResendConfig();
  return Boolean(config?.from && config.companyTo);
}
