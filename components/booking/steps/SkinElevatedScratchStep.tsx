import ScratchCard from "@/components/booking/ScratchCard";
import { StepBody, StepHeader } from "@/components/steps";

const revealImage = "/svgs/Rectangle 3467730.svg";

export default function SkinElevatedScratchStep() {
  return (
    <div>
      <StepHeader
        title="Your skin, elevated"
        subtitle="See the radiant difference"
      />

      <StepBody>
        <div className="mx-auto aspect-[233/306] w-full max-w-[16.25rem]">
          <ScratchCard revealSrc={revealImage} className="h-full w-full" />
        </div>
      </StepBody>
    </div>
  );
}
