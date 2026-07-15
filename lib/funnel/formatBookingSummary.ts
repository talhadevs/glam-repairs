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
  "booking.name",
  "booking.email",
]);

/** Ordered sections so the WhatsApp message reads like a clean intake form. */
const MESSAGE_SECTIONS: {
  title: string;
  keys: string[];
}[] = [
  {
    title: "Skin profile",
    keys: [
      "booking.skinType",
      "booking.improveArea",
      "booking.skinTone",
      "booking.additionalConcerns",
      "booking.skinSensitivity",
      "booking.moisturized",
      "booking.daytimeBothers",
      "booking.location",
    ],
  },
  {
    title: "Routine & products",
    keys: [
      "booking.dailyRoutine",
      "booking.skincareProducts",
      "booking.sunscreen",
      "booking.routineTime",
      "booking.sulfates",
      "booking.antioxidants",
      "booking.acids",
      "booking.retinolVitaminC",
      "booking.kbeautyRoutine",
      "booking.koreanRoutineLength",
      "booking.kbeautyGlow",
      "booking.koreanIngredients",
      "booking.koreanProducts",
      "booking.exosomesAwareness",
      "booking.addExosomes",
    ],
  },
  {
    title: "Lifestyle",
    keys: [
      "booking.sleep",
      "booking.waterIntake",
      "booking.stress",
      "booking.socialMedia",
    ],
  },
  {
    title: "Goals & event",
    keys: [
      "booking.improveGoals",
      "booking.feelGreatGoals",
      "booking.journeyFeel",
      "booking.withGlamGoals",
      "booking.specialEvent",
      "booking.eventDate",
    ],
  },
];

function labelForKey(key: string) {
  if (BOOKING_ANSWER_LABELS[key]) return BOOKING_ANSWER_LABELS[key];
  if (key.startsWith("booking.statement.")) {
    return humanizeSlug(key.replace("booking.statement.", ""));
  }
  return humanizeSlug(key.replace(/^booking\./, ""));
}

/** Convert slug / camelCase values like "dark-circles" → "Dark circles". */
function humanizeSlug(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
}

function formatValue(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;

  if (typeof value === "string") {
    if (value.startsWith("data:")) return "Uploaded";
    // Keep free-text location / dates / emails readable as-is when they contain spaces or @
    if (value.includes(" ") || value.includes("@") || /^\d{4}-\d{2}-\d{2}/.test(value)) {
      return value;
    }
    return humanizeSlug(value);
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

function pushField(
  lines: string[],
  key: string,
  answers: Record<string, unknown>,
) {
  const formatted = formatValue(answers[key]);
  if (!formatted) return false;
  lines.push(`• ${labelForKey(key)}: ${formatted}`);
  return true;
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
 * Build an organized WhatsApp message with booking answers grouped by section.
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
  const lines: string[] = [intro, ""];

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

  lines.push("*Contact*");
  if (name) lines.push(`• Name: ${name}`);
  if (mail) lines.push(`• Email: ${mail}`);
  if (sessionId) lines.push(`• Ref: ${sessionId.slice(0, 8)}`);
  if (!name && !mail && !sessionId) {
    lines.push("• (not provided)");
  }

  const listedKeys = new Set(MESSAGE_SECTIONS.flatMap((section) => section.keys));

  for (const section of MESSAGE_SECTIONS) {
    const sectionLines: string[] = [];
    for (const key of section.keys) {
      const before = sectionLines.length;
      pushField(sectionLines, key, answers);
      if (sectionLines.length > before) {
        listedKeys.add(key);
      }
    }
    if (sectionLines.length === 0) continue;
    lines.push("", `*${section.title}*`, ...sectionLines);
  }

  // Statement agreement ratings (agreement steps)
  const statementKeys = Object.keys(answers)
    .filter((key) => key.startsWith("booking.statement."))
    .sort();
  if (statementKeys.length > 0) {
    const statementLines: string[] = [];
    for (const key of statementKeys) {
      pushField(statementLines, key, answers);
    }
    if (statementLines.length > 0) {
      lines.push("", "*Preferences*", ...statementLines);
    }
  }

  // Any remaining booking.* keys not covered above
  const extraLines: string[] = [];
  for (const key of Object.keys(answers).sort()) {
    if (!key.startsWith("booking.")) continue;
    if (SKIP_KEYS.has(key)) continue;
    if (key === "booking.selfie") continue;
    if (key.startsWith("booking.statement.")) continue;
    if (listedKeys.has(key)) continue;
    pushField(extraLines, key, answers);
  }
  if (extraLines.length > 0) {
    lines.push("", "*Other*", ...extraLines);
  }

  lines.push("", "*Photos*");
  if (selfieUrl) {
    lines.push(`• Selfie: ${selfieUrl}`);
  } else if (answers["booking.selfie"]) {
    lines.push("• Selfie: Uploaded");
  } else {
    lines.push("• Selfie: Not uploaded");
  }

  return lines.join("\n");
}
