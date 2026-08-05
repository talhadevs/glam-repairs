import { Resend } from "resend";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const companyTo = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !from) {
    return null;
  }

  return {
    resend: new Resend(apiKey),
    from,
    companyTo: companyTo || null,
  };
}

export function isResendConfigured() {
  return Boolean(getResendConfig()?.from && process.env.RESEND_API_KEY?.trim());
}

export function isContactResendConfigured() {
  const config = getResendConfig();
  return Boolean(config?.from && config.companyTo);
}
