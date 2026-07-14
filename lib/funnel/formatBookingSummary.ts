/** Human-readable labels for booking funnel answers in WhatsApp summary. */
export const BOOKING_ANSWER_LABELS: Record<string, string> = {
  "booking.name": "Name",
  "booking.email": "Email",
  "booking.skinType": "Skin type",
  "booking.improveArea": "Improve area",
  "booking.skinTone": "Skin tone",
  "booking.dailyRoutine": "Daily routine",
  "booking.skincareProducts": "Skincare products",
  "booking.kbeautyRoutine": "K-Beauty routine",
  "booking.koreanRoutineLength": "Korean routine length",
  "booking.kbeautyGlow": "K-Beauty glow",
  "booking.koreanIngredients": "Korean ingredients",
  "booking.koreanProducts": "Korean products",
  "booking.pdrnHeard": "Heard of PDRN",
  "booking.addPdrn": "Add PDRN",
  "booking.exosomesAwareness": "Heard of exosomes",
  "booking.addExosomes": "Add exosomes",
  "booking.sunscreen": "Sunscreen",
  "booking.location": "Location",
  "booking.sulfates": "Sulfates",
  "booking.antioxidants": "Antioxidants",
  "booking.acids": "Acids",
  "booking.retinolVitaminC": "Retinol / Vitamin C",
  "booking.socialMedia": "Social media",
  "booking.additionalConcerns": "Additional concerns",
  "booking.moisturized": "Moisturized",
  "booking.daytimeBothers": "Daytime bothers",
  "booking.skinSensitivity": "Skin sensitivity",
  "booking.sleep": "Sleep",
  "booking.waterIntake": "Water intake",
  "booking.stress": "Stress",
  "booking.routineTime": "Routine time",
  "booking.improveGoals": "Improve goals",
  "booking.feelGreatGoals": "Feel-great goals",
  "booking.journeyFeel": "Journey feel",
  "booking.withGlamGoals": "With Glam goals",
  "booking.specialEvent": "Special event",
  "booking.eventDate": "Event date",
  "booking.selfie": "Selfie",
};

const SKIP_KEYS = new Set([
  "booking.locationLat",
  "booking.locationLon",
]);

function labelForKey(key: string) {
  if (BOOKING_ANSWER_LABELS[key]) return BOOKING_ANSWER_LABELS[key];
  if (key.startsWith("booking.statement.")) {
    return `Agreement: ${key.replace("booking.statement.", "").replace(/-/g, " ")}`;
  }
  return key.replace(/^booking\./, "").replace(/([A-Z])/g, " $1");
}

function formatValue(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;

  if (typeof value === "string") {
    if (value.startsWith("data:")) return "Uploaded";
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const parts = value
      .map((item) => formatValue(item))
      .filter((item): item is string => Boolean(item));
    return parts.length ? parts.join(", ") : null;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

export type BookingWhatsAppSummaryInput = {
  answers: Record<string, unknown>;
  fullName?: string;
  email?: string;
  sessionId?: string;
  selfieUrl?: string | null;
  /** Defaults to free-report completion copy; use for Get Premium upsell. */
  intro?: string;
};

/**
 * Build a compact WhatsApp message with all booking field answers.
 * Omits raw selfie data URLs (uses public selfieUrl when available).
 */
export function formatBookingWhatsAppMessage({
  answers,
  fullName,
  email,
  sessionId,
  selfieUrl,
  intro = "Hi GlamRepairs! I've completed my skin booking assessment.",
}: BookingWhatsAppSummaryInput) {
  const lines: string[] = [intro];

  const name =
    fullName?.trim() ||
    (typeof answers["booking.name"] === "string"
      ? answers["booking.name"]
      : "");
  const mail =
    email?.trim() ||
    (typeof answers["booking.email"] === "string"
      ? answers["booking.email"]
      : "");

  if (name) lines.push(`Name: ${name}`);
  if (mail) lines.push(`Email: ${mail}`);
  if (sessionId) lines.push(`Ref: ${sessionId.slice(0, 8)}`);
  if (selfieUrl) lines.push(`Selfie: ${selfieUrl}`);

  lines.push("", "My selections:");

  const keys = Object.keys(answers)
    .filter((key) => key.startsWith("booking."))
    .filter((key) => !SKIP_KEYS.has(key))
    .filter((key) => key !== "booking.name" && key !== "booking.email")
    .sort();

  for (const key of keys) {
    if (key === "booking.selfie") {
      if (!selfieUrl) lines.push(`${labelForKey(key)}: Uploaded`);
      continue;
    }

    const formatted = formatValue(answers[key]);
    if (!formatted) continue;
    lines.push(`${labelForKey(key)}: ${formatted}`);
  }

  return lines.join("\n");
}
