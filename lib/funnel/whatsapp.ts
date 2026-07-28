import {
  formatBookingWhatsAppMessage,
  type BookingWhatsAppSummaryInput,
} from "@/lib/funnel/formatBookingSummary";

// Business WhatsApp — override via NEXT_PUBLIC_WHATSAPP_NUMBER if needed.
// International digits only (no "+", spaces, or dashes).
const FALLBACK_WHATSAPP_NUMBER = "923355880333";

/** wa.me URLs break past ~2k chars; leave room for photo links. */
const MAX_WHATSAPP_MESSAGE_LENGTH = 2500;

export function getWhatsAppNumber() {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "") ||
    FALLBACK_WHATSAPP_NUMBER
  );
}

/** Local-style display, e.g. 0335-5880333 */
export function getWhatsAppDisplayNumber() {
  const digits = getWhatsAppNumber();
  if (digits.startsWith("92") && digits.length === 12) {
    const local = `0${digits.slice(2)}`;
    return `${local.slice(0, 4)}-${local.slice(4)}`;
  }
  return `+${digits}`;
}

export function getWhatsAppChatLink(prefilledText?: string) {
  const base = `https://wa.me/${getWhatsAppNumber()}`;
  if (!prefilledText) return base;
  return `${base}?text=${encodeURIComponent(prefilledText)}`;
}

export function truncateWhatsAppMessage(text: string) {
  if (text.length <= MAX_WHATSAPP_MESSAGE_LENGTH) return text;
  return `${text.slice(0, MAX_WHATSAPP_MESSAGE_LENGTH - 20).trimEnd()}\n…(truncated)`;
}

/** Prefill text for the assessment WhatsApp message. */
export function buildWhatsAppBookingSummaryText(
  input: BookingWhatsAppSummaryInput,
) {
  return truncateWhatsAppMessage(formatBookingWhatsAppMessage(input));
}

/**
 * After the full booking funnel — send every selected field in one WhatsApp message.
 */
export function buildWhatsAppBookingSummaryLink(
  input: BookingWhatsAppSummaryInput,
) {
  return getWhatsAppChatLink(buildWhatsAppBookingSummaryText(input));
}

export type WhatsAppOrderDetails = {
  planName: string;
  price: string;
  fullName?: string;
  email?: string;
  sessionId?: string;
  /** Public URL of the uploaded selfie (from Supabase Storage once wired). */
  imageUrl?: string | null;
};

/**
 * Pricing page / home pricing CTA — simple subscribe intent on WhatsApp.
 */
export function buildWhatsAppSubscribeLink(planName: string, price?: string) {
  const priceLabel =
    price && price !== "0.00" && price !== "0"
      ? ` (Rs. ${price})`
      : "";
  return getWhatsAppChatLink(
    `Hi GlamRepairs! I want to subscribe to the ${planName} plan${priceLabel}.`,
  );
}

/**
 * Build a wa.me deep link with a prefilled message so the team can identify the
 * lead, open the selfie, and collect payment over WhatsApp.
 */
export function buildWhatsAppOrderLink({
  planName,
  price,
  fullName,
  email,
  sessionId,
  imageUrl,
}: WhatsAppOrderDetails) {
  const lines = [
    `Hi GlamRepairs! I'd like to subscribe to the ${planName} plan (${price}).`,
    fullName ? `Name: ${fullName}` : null,
    email ? `Email: ${email}` : null,
    sessionId ? `Ref: ${sessionId.slice(0, 8)}` : null,
    imageUrl ? `Selfie: ${imageUrl}` : null,
  ].filter(Boolean);

  return getWhatsAppChatLink(lines.join("\n"));
}
