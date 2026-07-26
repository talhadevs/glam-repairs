import { redirect } from "next/navigation";

/** Single funnel starts at step 1 (URL matches progress bar). */
export default function OnboardingPage() {
  redirect("/onboarding/step/1");
}
