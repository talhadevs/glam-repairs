/**
 * Conditional branching rules for the booking funnel.
 *
 * A branch lets the funnel skip a range of steps based on a stored answer.
 */
export type BookingBranch = {
  fromStep: number;
  answerKey: string;
  whenValue: string;
  toStep: number;
};

export const BOOKING_BRANCHES: BookingBranch[] = [];

function answerMatches(
  branch: BookingBranch,
  answers: Record<string, unknown>,
) {
  return answers[branch.answerKey] === branch.whenValue;
}

/**
 * Resolve the next booking step number (honors branches).
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
 * Resolve the previous booking step number (honors branches).
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
