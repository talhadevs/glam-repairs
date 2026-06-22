import AnimatedCount from "@/components/booking/AnimatedCount";
import IngredientsFitChart from "@/components/booking/IngredientsFitChart";
import { StepHeader } from "@/components/steps";

export default function IngredientsFitStep() {
  return (
    <div>
      <div className="flex justify-center">
        <IngredientsFitChart />
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
            % fit to you thanks to hydration, sensitivity & goal
          </>
        }
      />
    </div>
  );
}
