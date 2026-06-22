import Image from "next/image";

import AnimatedCount from "@/components/booking/AnimatedCount";
import SkinWellnessChart from "@/components/booking/SkinWellnessChart";
import { StepHeader } from "@/components/steps";

const programFeatures = [
  {
    icon: "/svgs/Vector (9).svg",
    label: "Personalized to you",
  },
  {
    icon: "/svgs/Group 2085660800.svg",
    label: "Safe & dermatologist guided",
  },
  {
    icon: "/svgs/Group 2085660799.svg",
    label: "Targeted results",
  },
  {
    icon: "/svgs/Group 2085660791.svg",
    label: "Healthier skin, every day",
  },
] as const;

function ProgramFeatureItem({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
        <Image
          src={icon}
          alt=""
          width={42}
          height={42}
          className="h-8 w-auto object-contain sm:h-9"
        />
      </span>
      <p className="max-w-[4.75rem] text-[10px] leading-snug text-brand-ink sm:max-w-[5.25rem] sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}

export default function TreatmentFitStep() {
  return (
    <div>
      <div className="flex justify-center">
        <SkinWellnessChart />
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
            % fit to you by knowing your skin type and concerns
          </>
        }
      />

      <div className="mt-6 grid grid-cols-4 gap-2 sm:mt-7 sm:gap-3">
        {programFeatures.map((feature) => (
          <ProgramFeatureItem
            key={feature.label}
            icon={feature.icon}
            label={feature.label}
          />
        ))}
      </div>
    </div>
  );
}
