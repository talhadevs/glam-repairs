/**
 * Conditional branching rules for the booking funnel.
 *
 * A branch lets the funnel skip a range of steps based on a stored answer.
 * Example: on step 9 (K-Beauty routine), if the user picks "not-now" we jump
 * straight to step 14 and skip the Korean-routine steps (10-13).
 */
export type BookingBranch = {
  /** Step that holds the decision. */
  fromStep: number;
  /** Answer key in the funnel store. */
  answerKey: string;
  /** Value that triggers the skip. */
  whenValue: string;
  /** Step to jump to when the value matches. */
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

/** Resolve the next step from `stepNumber`, honoring any active branch. */
export function resolveBookingNextStep(
  stepNumber: number,
  answers: Record<string, unknown>,
): number | null {
  const branch = BOOKING_BRANCHES.find(
    (rule) => rule.fromStep === stepNumber && answerMatches(rule, answers),
  );
  return branch ? branch.toStep : null;
}

/** Resolve the previous step when arriving at `stepNumber`, honoring branches. */
export function resolveBookingPrevStep(
  stepNumber: number,
  answers: Record<string, unknown>,
): number | null {
  const branch = BOOKING_BRANCHES.find(
    (rule) => rule.toStep === stepNumber && answerMatches(rule, answers),
  );
  return branch ? branch.fromStep : null;
}
