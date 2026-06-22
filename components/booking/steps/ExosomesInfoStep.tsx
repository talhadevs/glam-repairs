import Image from "next/image";
import { StepHeader } from "@/components/steps";

const exosomesImage = "/images,svgs/Rectangle 3467708 (1).png";

export default function ExosomesInfoStep() {
  return (
    <div>
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
        <Image
          src={exosomesImage}
          alt="Skin cross-section illustration showing exosome penetration"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 32rem"
          className="object-cover"
        />
      </div>

      <StepHeader
        className="mt-5 sm:mt-6"
        title="Why exosomes are changing Skincare"
        subtitle="Exosomes are microscopic messengers that help skin cells regenerate faster."
      />
    </div>
  );
}
