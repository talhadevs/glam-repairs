import AnimatedCount from "@/components/booking/AnimatedCount";
import TreatmentProgramFitChart from "@/components/booking/TreatmentProgramFitChart";
import { StepHeader } from "@/components/steps";

export default function TreatmentProgramFitStep() {
  return (
    <div>
      <div className="flex justify-center">
        <TreatmentProgramFitChart />
      </div>

      <StepHeader
        className="mt-5 sm:mt-6"
        titleSize="sm"
        title={
          <>
            Your treatment program is a{" "}
            <AnimatedCount
              value={93}
              className="inline-block text-brand-primary"
              duration={1600}
            />
            % fit to your skin by knowing you better
          </>
        }
      />
    </div>
  );
}
