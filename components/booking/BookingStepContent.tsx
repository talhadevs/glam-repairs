import AcidsStep from "@/components/booking/steps/AcidsStep";
import AdditionalConcernsStep from "@/components/booking/steps/AdditionalConcernsStep";
import AddExosomesStep from "@/components/booking/steps/AddExosomesStep";
import AddPdrnStep from "@/components/booking/steps/AddPdrnStep";
import CosmetologistsStep from "@/components/booking/steps/CosmetologistsStep";
import AntioxidantsStep from "@/components/booking/steps/AntioxidantsStep";
import DailyRoutineStep from "@/components/booking/steps/DailyRoutineStep";
import DaytimeSkinBothersStep from "@/components/booking/steps/DaytimeSkinBothersStep";
import ExosomesInfoStep from "@/components/booking/steps/ExosomesInfoStep";
import ExosomesStep from "@/components/booking/steps/ExosomesStep";
import FeelGreatSkinGoalsStep from "@/components/booking/steps/FeelGreatSkinGoalsStep";
import GlamImproveGoalsStep from "@/components/booking/steps/GlamImproveGoalsStep";
import ImproveAreasStep from "@/components/booking/steps/ImproveAreasStep";
import IngredientsFitStep from "@/components/booking/steps/IngredientsFitStep";
import KBeautyGlowStep from "@/components/booking/steps/KBeautyGlowStep";
import KBeautyRoutineStep from "@/components/booking/steps/KBeautyRoutineStep";
import KoreanIngredientsStep from "@/components/booking/steps/KoreanIngredientsStep";
import KoreanRoutineStepsStep from "@/components/booking/steps/KoreanRoutineStepsStep";
import KoreanSkincareProductsStep from "@/components/booking/steps/KoreanSkincareProductsStep";
import LocationStep from "@/components/booking/steps/LocationStep";
import MoisturizedStep from "@/components/booking/steps/MoisturizedStep";
import NotAloneStep from "@/components/booking/steps/NotAloneStep";
import PdrnInfoStep from "@/components/booking/steps/PdrnInfoStep";
import PdrnStep from "@/components/booking/steps/PdrnStep";
import ProfileReadyStep from "@/components/booking/steps/ProfileReadyStep";
import RetinolVitaminCStep from "@/components/booking/steps/RetinolVitaminCStep";
import SkinImprovementStep from "@/components/booking/steps/SkinImprovementStep";
import SkinSensitivityStep from "@/components/booking/steps/SkinSensitivityStep";
import SleepStep from "@/components/booking/steps/SleepStep";
import SkincareRoutineTimeStep from "@/components/booking/steps/SkincareRoutineTimeStep";
import SkincareProductsStep from "@/components/booking/steps/SkincareProductsStep";
import SocialMediaStep from "@/components/booking/steps/SocialMediaStep";
import SkinProfileStep from "@/components/booking/steps/SkinProfileStep";
import SkinToneStep from "@/components/booking/steps/SkinToneStep";
import SkinTypeStep from "@/components/booking/steps/SkinTypeStep";
import SunscreenStep from "@/components/booking/steps/SunscreenStep";
import StressStep from "@/components/booking/steps/StressStep";
import SulfatesStep from "@/components/booking/steps/SulfatesStep";
import TreatmentFitStep from "@/components/booking/steps/TreatmentFitStep";
import TreatmentProgramFitStep from "@/components/booking/steps/TreatmentProgramFitStep";
import WaterIntakeStep from "@/components/booking/steps/WaterIntakeStep";

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
    case 13:
      return <KoreanSkincareProductsStep />;
    case 14:
      return <PdrnStep />;
    case 15:
      return <PdrnInfoStep />;
    case 16:
      return <AddPdrnStep />;
    case 17:
      return <ExosomesStep />;
    case 18:
      return <ExosomesInfoStep />;
    case 19:
      return <AddExosomesStep />;
    case 20:
      return <SunscreenStep />;
    case 21:
      return <LocationStep />;
    case 22:
      return <SulfatesStep />;
    case 23:
      return <AntioxidantsStep />;
    case 24:
      return <AcidsStep />;
    case 25:
      return <RetinolVitaminCStep />;
    case 26:
      return <IngredientsFitStep />;
    case 27:
      return <SocialMediaStep />;
    case 28:
      return <CosmetologistsStep />;
    case 29:
      return <AdditionalConcernsStep />;
    case 30:
      return <MoisturizedStep />;
    case 31:
      return <DaytimeSkinBothersStep />;
    case 32:
      return <SkinSensitivityStep />;
    case 33:
      return <SkinImprovementStep />;
    case 34:
      return <SleepStep />;
    case 35:
      return <WaterIntakeStep />;
    case 36:
      return <StressStep />;
    case 37:
      return <SkincareRoutineTimeStep />;
    case 38:
      return <ProfileReadyStep />;
    case 39:
      return <TreatmentProgramFitStep />;
    case 40:
      return <GlamImproveGoalsStep />;
    case 41:
      return <FeelGreatSkinGoalsStep />;
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
