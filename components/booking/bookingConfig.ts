/**
 * Single funnel entry — booking routes redirect here.
 * Kept export name so existing CTA imports keep working.
 */
export const BOOKING_START_HREF = "/onboarding/step/1";

/** @deprecated Booking steps retired; kept for any leftover unlock math. */
export const BOOKING_LAST_STEP = 1;

export const BOOKING_FORM_STEPS = BOOKING_LAST_STEP;

export const BOOKING_TOTAL_STEPS = BOOKING_LAST_STEP;

export function getBookingStepProgress(stepNumber: number): number {
  return Math.min(Math.max(stepNumber, 1), BOOKING_TOTAL_STEPS);
}

export function mapLegacyBookingStep(_stepNumber: number): number | null {
  return null;
}
