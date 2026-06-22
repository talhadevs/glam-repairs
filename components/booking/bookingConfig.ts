export const BOOKING_TOTAL_STEPS = 30;

export const BOOKING_FORM_STEPS = BOOKING_TOTAL_STEPS;

export function getBookingStepProgress(stepNumber: number): number {
  return Math.min(Math.max(stepNumber, 1), BOOKING_TOTAL_STEPS);
}
