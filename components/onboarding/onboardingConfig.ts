export const ONBOARDING_TOTAL_STEPS = 10;
export const ONBOARDING_FORM_STEPS = 10;

export const ONBOARDING_PROGRESS = {
  planSelection: 9,
  consent: 10,
} as const;

export function getFormStepProgress(formStep: number) {
  return formStep;
}
