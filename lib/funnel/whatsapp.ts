// Placeholder business number — update via NEXT_PUBLIC_WHATSAPP_NUMBER env var.
// Use international format with no "+", spaces, or dashes (e.g. 923001234567).
const FALLBACK_WHATSAPP_NUMBER = "920000000000";

export function getWhatsAppNumber() {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "") ||
    FALLBACK_WHATSAPP_NUMBER
  );
}

export type WhatsAppOrderDetails = {
  planName: string;
  price: string;
  fullName?: string;
  email?: string;
  sessionId?: string;
};

/**
 * Build a wa.me deep link with a prefilled message so the team can identify the
 * lead and collect payment over WhatsApp.
 */
export function buildWhatsAppOrderLink({
  planName,
  price,
  fullName,
  email,
  sessionId,
}: WhatsAppOrderDetails) {
  const lines = [
    `Hi GlamRepairs! I'd like to subscribe to the ${planName} plan (${price}).`,
    fullName ? `Name: ${fullName}` : null,
    email ? `Email: ${email}` : null,
    sessionId ? `Ref: ${sessionId.slice(0, 8)}` : null,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${getWhatsAppNumber()}?text=${text}`;
}
