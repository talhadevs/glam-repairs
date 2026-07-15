/**
 * Conditional branching rules for the booking funnel.
 *
 * Example: on step 9 (K-Beauty routine), if the user picks "not-now" we jump
 * straight to step 14 (Exosomes) and skip the Korean-routine steps (10–13).
 */
export type BookingBranch = {
  fromStep: number;
  answerKey: string;
  whenValue: string;
  toStep: number;
};

export const BOOKING_BRANCHES: BookingBranch[] = [
  {
    fromStep: 9,
    answerKey: "booking.kbeautyRoutine",
    whenValue: "not-now",
    toStep: 14,
  },
];

function answerMatches(
  branch: BookingBranch,
  answers: Record<string, unknown>,
) {
  return answers[branch.answerKey] === branch.whenValue;
}

/**
 * Resolve the next booking step number (honors K-Beauty skip).
 */
export function getBookingNextStepNumber(
  stepNumber: number,
  answers: Record<string, unknown>,
): number {
  const branch = BOOKING_BRANCHES.find(
    (rule) => rule.fromStep === stepNumber && answerMatches(rule, answers),
  );
  if (branch) return branch.toStep;
  return stepNumber + 1;
}

/**
 * Resolve the previous booking step number (honors K-Beauty skip).
 */
export function getBookingPrevStepNumber(
  stepNumber: number,
  answers: Record<string, unknown>,
): number | null {
  const branch = BOOKING_BRANCHES.find(
    (rule) => rule.toStep === stepNumber && answerMatches(rule, answers),
  );
  if (branch) return branch.fromStep;

  if (stepNumber <= 1) return null;
  return stepNumber - 1;
}
