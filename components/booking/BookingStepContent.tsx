import CosmetologistsStep from "@/components/booking/steps/CosmetologistsStep";
import DailyRoutineStep from "@/components/booking/steps/DailyRoutineStep";
import EventDateStep from "@/components/booking/steps/EventDateStep";
import GlamImproveGoalsStep from "@/components/booking/steps/GlamImproveGoalsStep";
import GoalPlanStep from "@/components/booking/steps/GoalPlanStep";
import ImproveAreasStep from "@/components/booking/steps/ImproveAreasStep";
import IngredientsFitStep from "@/components/booking/steps/IngredientsFitStep";
import KeepResultsStep from "@/components/booking/steps/KeepResultsStep";
import LocationStep from "@/components/booking/steps/LocationStep";
import NameStep from "@/components/booking/steps/NameStep";
import NotAloneStep from "@/components/booking/steps/NotAloneStep";
import ProfileReadyStep from "@/components/booking/steps/ProfileReadyStep";
import ProgramJourneyStep from "@/components/booking/steps/ProgramJourneyStep";
import SkinConditionWorseningStep from "@/components/booking/steps/SkinConditionWorseningStep";
import SkinElevatedScratchStep from "@/components/booking/steps/SkinElevatedScratchStep";
import SkinElevatedStep from "@/components/booking/steps/SkinElevatedStep";
import SkinProfileStep from "@/components/booking/steps/SkinProfileStep";
import SkinResultsTimelineStep from "@/components/booking/steps/SkinResultsTimelineStep";
import SkincareJourneyFeelStep from "@/components/booking/steps/SkincareJourneyFeelStep";
import SkincareProductsStep from "@/components/booking/steps/SkincareProductsStep";
import SkincareRoutineTimeStep from "@/components/booking/steps/SkincareRoutineTimeStep";
import SkinToneStep from "@/components/booking/steps/SkinToneStep";
import SkinTypeStep from "@/components/booking/steps/SkinTypeStep";
import SpecialEventStep from "@/components/booking/steps/SpecialEventStep";
import StatementAgreementStep from "@/components/booking/steps/StatementAgreementStep";
import TreatmentFitStep from "@/components/booking/steps/TreatmentFitStep";
import TreatmentProgramFitStep from "@/components/booking/steps/TreatmentProgramFitStep";

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
      return <LocationStep />;
    case 10:
      return <IngredientsFitStep />;
    case 11:
      return <CosmetologistsStep />;
    case 12:
      return <SkincareRoutineTimeStep />;
    case 13:
      return <ProfileReadyStep />;
    case 14:
      return <TreatmentProgramFitStep />;
    case 15:
      return <GlamImproveGoalsStep />;
    case 16:
      return <SkincareJourneyFeelStep />;
    case 17:
      return (
        <StatementAgreementStep statement="Brand loyalty matters to me" />
      );
    case 18:
      return (
        <StatementAgreementStep statement="Occasionally, I purchase products due to the hype" />
      );
    case 19:
      return (
        <StatementAgreementStep statement="I'm not always sure if I'm applying my skincare products correctly" />
      );
    case 20:
      return <SkinConditionWorseningStep />;
    case 21:
      return <SpecialEventStep />;
    case 22:
      return <EventDateStep />;
    case 23:
      return <GoalPlanStep />;
    case 25:
      return <ProgramJourneyStep />;
    case 26:
      return <KeepResultsStep />;
    case 27:
      return <NameStep />;
    case 28:
      return <SkinElevatedStep />;
    case 29:
      return <SkinElevatedScratchStep />;
    case 30:
      return <SkinResultsTimelineStep />;
    default:
      return null;
  }
}
