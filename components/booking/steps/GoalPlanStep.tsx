import GoalProgressChart from "@/components/booking/GoalProgressChart";
import { StepBody, StepHeader } from "@/components/steps";

export default function GoalPlanStep() {
  return (
    <div>
      <StepHeader
        title="The last plan you'll ever need for normal skin type"
        subtitle="We predict you'll reach goal by Jul 10 just in time for the holiday"
        titleClassName="leading-snug sm:leading-snug"
      />

      <StepBody>
        <div className="flex justify-center">
          <GoalProgressChart />
        </div>
      </StepBody>
    </div>
  );
}
