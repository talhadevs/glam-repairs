import type { Metadata } from "next";
import ProgramIntroScreen from "@/components/onboarding/ProgramIntroScreen";

export const metadata: Metadata = {
  title: "Your Program | GlamRepairs",
  description:
    "Learn what is included in your personalized skin guidance program.",
};

export default function ProgramIntroPage() {
  return <ProgramIntroScreen />;
}
