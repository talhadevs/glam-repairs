import type { Metadata } from "next";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";

export const metadata: Metadata = {
  title: "Welcome | GlamRepairs",
  description:
    "Start your personalized skin guidance journey with Glam Repairs.",
};

export default function OnboardingPage() {
  return <WelcomeScreen />;
}
