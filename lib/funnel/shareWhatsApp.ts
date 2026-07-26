import {
  getWhatsAppChatLink,
  truncateWhatsAppMessage,
} from "@/lib/funnel/whatsapp";

/**
 * Open WhatsApp chat with the prefilled assessment message.
 * Uses wa.me only (no OS share sheet). Photo links go in the message text
 * when Supabase upload returns public URLs.
 */
export function openWhatsAppWithMessage(message: string) {
  window.open(
    getWhatsAppChatLink(truncateWhatsAppMessage(message)),
    "_blank",
    "noopener,noreferrer",
  );
}
