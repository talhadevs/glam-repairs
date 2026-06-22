import Image from "next/image";

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

      <header className="mt-5 sm:mt-6">
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What is PDRN?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          PDRN (polydeoxyribonucleotide) is a salmon DNA-based ingredient
          clinically studied for skin repair, hydration, and elasticity. It
          boosts regeneration and reduces inflammation.
        </p>
      </header>
    </div>
  );
}
