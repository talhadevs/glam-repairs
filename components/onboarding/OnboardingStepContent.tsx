import AboutYouStep from "@/components/onboarding/steps/AboutYouStep";
import ConcernDurationStep from "@/components/onboarding/steps/ConcernDurationStep";
import CurrentRoutineStep from "@/components/onboarding/steps/CurrentRoutineStep";
import LifestyleStep from "@/components/onboarding/steps/LifestyleStep";
import PrimaryConcernStep from "@/components/onboarding/steps/PrimaryConcernStep";
import SkinZoneSelectionStep from "@/components/onboarding/steps/SkinZoneSelectionStep";
import UploadInstructionStep from "@/components/onboarding/steps/UploadInstructionStep";
import UploadPhotosStep from "@/components/onboarding/steps/UploadPhotosStep";

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
      return <SkinZoneSelectionStep />;
    case 2:
      return <PrimaryConcernStep />;
    case 3:
      return <ConcernDurationStep />;
    case 4:
      return <AboutYouStep />;
    case 5:
      return <CurrentRoutineStep />;
    case 6:
      return <LifestyleStep />;
    case 7:
      return <UploadInstructionStep />;
    case 8:
      return <UploadPhotosStep />;
    default:
      return <StepPlaceholder stepNumber={stepNumber} />;
  }
}
