import SkinConditionTrendChart from "@/components/booking/SkinConditionTrendChart";
import { StepBody, StepHeader } from "@/components/steps";

export default function SkinConditionWorseningStep() {
  return (
    <div>
      <StepHeader
        title="Get rid of your skin issues with science and self-care"
        titleClassName="leading-snug sm:leading-snug"
      />

      <StepBody>
        <div className="flex justify-center">
          <SkinConditionTrendChart />
        </div>

        <p className="mt-5 font-serif text-[1.35rem] leading-snug text-brand-ink sm:mt-6 sm:text-[1.5rem]">
          Skin condition worsening
        </p>
      </StepBody>
    </div>
  );
}
