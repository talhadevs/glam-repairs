export const BOOKING_START_HREF = "/booking/step/1";

/** Highest booking URL step (`/booking/step/N`) — PDRN removed, routes renumbered. */
export const BOOKING_LAST_STEP = 56;

export const BOOKING_FORM_STEPS = BOOKING_LAST_STEP;

/** Visible progress total (same as last step after route renumber). */
export const BOOKING_TOTAL_STEPS = BOOKING_LAST_STEP;

export function getBookingStepProgress(stepNumber: number): number {
  return Math.min(Math.max(stepNumber, 1), BOOKING_TOTAL_STEPS);
}

/**
 * Old booking URLs after the last new step (57–59) map down by 3
 * (pre-renumber last cards). Steps 1–56 are the live sequential routes.
 */
export function mapLegacyBookingStep(stepNumber: number): number | null {
  if (stepNumber >= 57 && stepNumber <= 59) {
    return stepNumber - 3;
  }
  return null;
}
