import AnimatedCount from "@/components/booking/AnimatedCount";
import MapWithAnimatedDots from "@/components/booking/MapWithAnimatedDots";
import { StepBody, StepHeader } from "@/components/steps";

export default function NotAloneStep() {
  return (
    <div>
      <MapWithAnimatedDots />

      <StepBody className="mt-6 sm:mt-8">
        <StepHeader title="You're not alone!" />
        <p className="mt-3 font-serif text-[1.35rem] leading-snug text-brand-ink sm:text-[1.5rem]">
          Glam has helped{" "}
          <AnimatedCount
            value={23428}
            className="inline-block text-brand-primary"
          />{" "}
          people with similar concerns
        </p>
      </StepBody>
    </div>
  );
}
