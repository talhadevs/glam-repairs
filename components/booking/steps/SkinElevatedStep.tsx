import SkinElevatedMetricsGrid from "@/components/booking/SkinElevatedMetricsGrid";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import { StepBody, StepHeader } from "@/components/steps";

const beforeImage = "/svgs/Rectangle 3467729.svg";
const afterImage = "/svgs/Rectangle 3467730.svg";

export default function SkinElevatedStep() {
  return (
    <div>
      <StepHeader
        title="Your skin, elevated"
        subtitle="See the radiant difference"
      />

      <StepBody>
        <div className="mx-auto aspect-[233/306] w-full max-w-[16.25rem]">
          <BeforeAfterSlider
            beforeSrc={beforeImage}
            afterSrc={afterImage}
            imageAlt="Before and after skin comparison"
            showLabels={false}
            handleVariant="arrow-right"
            contentScale={1}
            imagePosition="center"
            unoptimized
            roundedClassName="rounded-2xl"
            handleClassName="h-10 w-10"
          />
        </div>

        <div className="mt-5 sm:mt-6">
          <SkinElevatedMetricsGrid />
        </div>
      </StepBody>
    </div>
  );
}
