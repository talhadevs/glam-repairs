import Image from "next/image";
import { StepHeader } from "@/components/steps";

const pdrnImage = "/images,svgs/Rectangle 3467708.png";

export default function PdrnInfoStep() {
  return (
    <div>
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
        <Image
          src={pdrnImage}
          alt="Skincare serum dropper"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 32rem"
          className="object-cover"
        />
      </div>

      <StepHeader
        className="mt-5 sm:mt-6"
        title="What is PDRN?"
        subtitle="PDRN (polydeoxyribonucleotide) is a salmon DNA-based ingredient clinically studied for skin repair, hydration, and elasticity. It boosts regeneration and reduces inflammation."
      />
    </div>
  );
}
