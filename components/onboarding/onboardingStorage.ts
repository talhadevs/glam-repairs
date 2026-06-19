const ONBOARDING_NAME_KEY = "glam-onboarding-name";

export function saveOnboardingFirstName(fullName: string) {
  if (typeof window === "undefined") return;

  const firstName = fullName.trim().split(/\s+/)[0] ?? "";
  if (firstName) {
    sessionStorage.setItem(ONBOARDING_NAME_KEY, firstName);
  }
}

export function getOnboardingFirstName() {
  if (typeof window === "undefined") return "";

  return sessionStorage.getItem(ONBOARDING_NAME_KEY) ?? "";
}
