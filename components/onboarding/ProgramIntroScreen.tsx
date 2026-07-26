import OnboardingIntroNav from "@/components/onboarding/OnboardingIntroNav";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import ProgramIntroContent from "@/components/onboarding/ProgramIntroContent";
import {
  ONBOARDING_PROGRESS,
  ONBOARDING_TOTAL_STEPS,
} from "@/components/onboarding/onboardingConfig";

export default function ProgramIntroScreen() {
  return (
    <OnboardingShell
      currentStep={ONBOARDING_PROGRESS.program}
      totalSteps={ONBOARDING_TOTAL_STEPS}
      footer={
        <OnboardingIntroNav
          backHref="/onboarding"
          nextHref="/onboarding/not-alone"
          gated={false}
        />
      }
    >
      <ProgramIntroContent />
    </OnboardingShell>
  );
}
