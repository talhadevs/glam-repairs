import type { Metadata } from "next";

import ThankYouStep from "@/components/onboarding/steps/ThankYouStep";

export const metadata: Metadata = {
  title: "Thank You | GlamRepairs",
  description: "Your skin assessment submission has been received.",
};

export default function OnboardingCompletePage() {
  return <ThankYouStep />;
}
