/**
 * Keep quiz answers for the lead row, but drop heavy data-URL blobs.
 * Photos live in Storage and expire separately after 30 days.
 */
export function sanitizeLeadAnswers(
  answers: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!answers) return {};

  const next: Record<string, unknown> = { ...answers };

  if (Array.isArray(next["onboarding.photos"])) {
    const count = (next["onboarding.photos"] as unknown[]).filter(
      (item) => typeof item === "string" && item.length > 0,
    ).length;
    next["onboarding.photos"] = { uploaded: true, count };
  }

  if (
    typeof next["booking.selfie"] === "string" &&
    next["booking.selfie"].startsWith("data:")
  ) {
    next["booking.selfie"] = "uploaded";
  }

  return next;
}
