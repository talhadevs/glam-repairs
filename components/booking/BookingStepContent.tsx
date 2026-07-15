import AcidsStep from "@/components/booking/steps/AcidsStep";
import AdditionalConcernsStep from "@/components/booking/steps/AdditionalConcernsStep";
import AddExosomesStep from "@/components/booking/steps/AddExosomesStep";
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
import EventDateStep from "@/components/booking/steps/EventDateStep";
import GoalPlanStep from "@/components/booking/steps/GoalPlanStep";
import KeepResultsStep from "@/components/booking/steps/KeepResultsStep";
import NameStep from "@/components/booking/steps/NameStep";
import ProfileReadyStep from "@/components/booking/steps/ProfileReadyStep";
import ProgramJourneyStep from "@/components/booking/steps/ProgramJourneyStep";
import RetinolVitaminCStep from "@/components/booking/steps/RetinolVitaminCStep";
import SkinConditionWorseningStep from "@/components/booking/steps/SkinConditionWorseningStep";
import SkinElevatedScratchStep from "@/components/booking/steps/SkinElevatedScratchStep";
import SkinElevatedStep from "@/components/booking/steps/SkinElevatedStep";
import SkinResultsTimelineStep from "@/components/booking/steps/SkinResultsTimelineStep";
import SkincareJourneyFeelStep from "@/components/booking/steps/SkincareJourneyFeelStep";
import SkinImprovementStep from "@/components/booking/steps/SkinImprovementStep";
import SkinSensitivityStep from "@/components/booking/steps/SkinSensitivityStep";
import SleepStep from "@/components/booking/steps/SleepStep";
import SkincareRoutineTimeStep from "@/components/booking/steps/SkincareRoutineTimeStep";
import SkincareProductsStep from "@/components/booking/steps/SkincareProductsStep";
import SocialMediaStep from "@/components/booking/steps/SocialMediaStep";
import SpecialEventStep from "@/components/booking/steps/SpecialEventStep";
import StatementAgreementStep from "@/components/booking/steps/StatementAgreementStep";
import SkinProfileStep from "@/components/booking/steps/SkinProfileStep";
import SkinToneStep from "@/components/booking/steps/SkinToneStep";
import SkinTypeStep from "@/components/booking/steps/SkinTypeStep";
import SunscreenStep from "@/components/booking/steps/SunscreenStep";
import StressStep from "@/components/booking/steps/StressStep";
import SulfatesStep from "@/components/booking/steps/SulfatesStep";
import TreatmentFitStep from "@/components/booking/steps/TreatmentFitStep";
import TreatmentProgramFitStep from "@/components/booking/steps/TreatmentProgramFitStep";
import WaterIntakeStep from "@/components/booking/steps/WaterIntakeStep";
import WithGlamGoalsStep from "@/components/booking/steps/WithGlamGoalsStep";

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
      return <ExosomesStep />;
    case 15:
      return <ExosomesInfoStep />;
    case 16:
      return <AddExosomesStep />;
    case 17:
      return <SunscreenStep />;
    case 18:
      return <LocationStep />;
    case 19:
      return <SulfatesStep />;
    case 20:
      return <AntioxidantsStep />;
    case 21:
      return <AcidsStep />;
    case 22:
      return <RetinolVitaminCStep />;
    case 23:
      return <IngredientsFitStep />;
    case 24:
      return <SocialMediaStep />;
    case 25:
      return <CosmetologistsStep />;
    case 26:
      return <AdditionalConcernsStep />;
    case 27:
      return <MoisturizedStep />;
    case 28:
      return <DaytimeSkinBothersStep />;
    case 29:
      return <SkinSensitivityStep />;
    case 30:
      return <SkinImprovementStep />;
    case 31:
      return <SleepStep />;
    case 32:
      return <WaterIntakeStep />;
    case 33:
      return <StressStep />;
    case 34:
      return <SkincareRoutineTimeStep />;
    case 35:
      return <ProfileReadyStep />;
    case 36:
      return <TreatmentProgramFitStep />;
    case 37:
      return <GlamImproveGoalsStep />;
    case 38:
      return <FeelGreatSkinGoalsStep />;
    case 39:
      return <SkincareJourneyFeelStep />;
    case 40:
      return <WithGlamGoalsStep />;
    case 41:
      return (
        <StatementAgreementStep statement="Finding skincare products that suit me is challenging" />
      );
    case 42:
      return (
        <StatementAgreementStep statement="I often consider the price of skincare products" />
      );
    case 43:
      return (
        <StatementAgreementStep statement="Brand loyalty matters to me" />
      );
    case 44:
      return (
        <StatementAgreementStep statement="Occasionally, I purchase products due to the hype" />
      );
    case 45:
      return (
        <StatementAgreementStep statement="I'm not always sure if I'm applying my skincare products correctly" />
      );
    case 46:
      return <SkinConditionWorseningStep />;
    case 47:
      return <SpecialEventStep />;
    case 48:
      return <EventDateStep />;
    case 49:
      return <GoalPlanStep />;
    case 51:
      return <ProgramJourneyStep />;
    case 52:
      return <KeepResultsStep />;
    case 53:
      return <NameStep />;
    case 54:
      return <SkinElevatedStep />;
    case 55:
      return <SkinElevatedScratchStep />;
    case 56:
      return <SkinResultsTimelineStep />;
    default:
      return null;
  }
}
