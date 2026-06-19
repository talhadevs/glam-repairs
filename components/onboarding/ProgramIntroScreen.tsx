import OnboardingIntroNav from "@/components/onboarding/OnboardingIntroNav";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import ProgramIntroContent from "@/components/onboarding/ProgramIntroContent";

export default function ProgramIntroScreen() {
  return (
    <OnboardingShell
      showProgress={false}
      footer={
        <OnboardingIntroNav
          backHref="/onboarding"
          nextHref="/onboarding/step/1"
        />
      }
    >
      <ProgramIntroContent />
    </OnboardingShell>
  );
}
