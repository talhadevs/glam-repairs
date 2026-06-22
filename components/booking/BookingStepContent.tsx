import DailyRoutineStep from "@/components/booking/steps/DailyRoutineStep";
import ImproveAreasStep from "@/components/booking/steps/ImproveAreasStep";
import KBeautyGlowStep from "@/components/booking/steps/KBeautyGlowStep";
import KBeautyRoutineStep from "@/components/booking/steps/KBeautyRoutineStep";
import KoreanIngredientsStep from "@/components/booking/steps/KoreanIngredientsStep";
import KoreanRoutineStepsStep from "@/components/booking/steps/KoreanRoutineStepsStep";
import NotAloneStep from "@/components/booking/steps/NotAloneStep";
import SkincareProductsStep from "@/components/booking/steps/SkincareProductsStep";
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
    case 8:
      return <SkincareProductsStep />;
    case 9:
      return <KBeautyRoutineStep />;
    case 10:
      return <KoreanRoutineStepsStep />;
    case 11:
      return <KBeautyGlowStep />;
    case 12:
      return <KoreanIngredientsStep />;
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
