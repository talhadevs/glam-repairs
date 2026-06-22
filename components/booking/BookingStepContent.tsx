import DailyRoutineStep from "@/components/booking/steps/DailyRoutineStep";
import ImproveAreasStep from "@/components/booking/steps/ImproveAreasStep";
import NotAloneStep from "@/components/booking/steps/NotAloneStep";
import SkinProfileStep from "@/components/booking/steps/SkinProfileStep";
import SkinToneStep from "@/components/booking/steps/SkinToneStep";
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
    case 4:
      return <ImproveAreasStep />;
    case 5:
      return <SkinToneStep />;
    case 6:
      return <SkinProfileStep />;
    case 7:
      return <DailyRoutineStep />;
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
