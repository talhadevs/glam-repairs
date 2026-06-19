import AboutYouStep from "@/components/onboarding/steps/AboutYouStep";
import AgeStep from "@/components/onboarding/steps/AgeStep";
import GenderStep from "@/components/onboarding/steps/GenderStep";

type StepContentProps = {
  stepNumber: number;
};

function StepPlaceholder({ stepNumber }: { stepNumber: number }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
        Step {stepNumber}
      </p>
      <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-primary sm:text-[2rem]">
        Coming soon
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-gray">
        This step will be added next.
      </p>
    </div>
  );
}

export default function OnboardingStepContent({ stepNumber }: StepContentProps) {
  switch (stepNumber) {
    case 1:
      return <AboutYouStep />;
    case 2:
      return <GenderStep />;
    case 3:
      return <AgeStep />;
    default:
      return <StepPlaceholder stepNumber={stepNumber} />;
  }
}
