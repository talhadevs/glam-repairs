import NotAloneStep from "@/components/booking/steps/NotAloneStep";
import SkinTypeStep from "@/components/booking/steps/SkinTypeStep";
import TreatmentFitStep from "@/components/booking/steps/TreatmentFitStep";

type BookingStepContentProps = {
  stepNumber: number;
};

export default function BookingStepContent({ stepNumber }: BookingStepContentProps) {
  switch (stepNumber) {
    case 1:
      return <SkinTypeStep />;
    case 2:
      return <NotAloneStep />;
    case 3:
      return <TreatmentFitStep />;
    default:
      return (
        <div>
          <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
            Step {stepNumber}
          </h1>
          <p className="mt-3 text-sm text-brand-gray">Coming soon.</p>
        </div>
      );
  }
}
