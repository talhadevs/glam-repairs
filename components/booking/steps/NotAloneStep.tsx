import AnimatedCount from "@/components/booking/AnimatedCount";
import MapWithAnimatedDots from "@/components/booking/MapWithAnimatedDots";
import { StepBody } from "@/components/steps";

export default function NotAloneStep() {
  return (
    <div>
      <MapWithAnimatedDots />

      <StepBody className="mt-10 sm:mt-12">
        <p className="font-serif text-[2rem] leading-[1.15] text-[#1b1b1b] sm:text-[2.375rem]">
          You&apos;re not alone! Glam has helped{" "}
          <AnimatedCount value={23428} className="inline-block" /> people with
          similar concerns
        </p>
      </StepBody>
    </div>
  );
}
