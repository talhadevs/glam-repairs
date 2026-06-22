import AboutYouStep from "@/components/onboarding/steps/AboutYouStep";
import ConcernDurationStep from "@/components/onboarding/steps/ConcernDurationStep";
import CurrentRoutineStep from "@/components/onboarding/steps/CurrentRoutineStep";
import LifestyleStep from "@/components/onboarding/steps/LifestyleStep";
import PrimaryConcernStep from "@/components/onboarding/steps/PrimaryConcernStep";
import SkinZoneSelectionStep from "@/components/onboarding/steps/SkinZoneSelectionStep";
import UploadInstructionStep from "@/components/onboarding/steps/UploadInstructionStep";
import UploadPhotosStep from "@/components/onboarding/steps/UploadPhotosStep";
import { StepHeader } from "@/components/steps";

type StepContentProps = {
  stepNumber: number;
};

function StepPlaceholder({ stepNumber }: { stepNumber: number }) {
  return (
    <div>
      <StepHeader
        eyebrow={`Step ${stepNumber}`}
        title="Coming soon"
        titleClassName="font-serif text-[1.75rem] leading-tight text-brand-primary sm:text-[2rem]"
        subtitle="This step will be added next."
      />
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
