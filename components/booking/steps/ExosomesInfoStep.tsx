import Image from "next/image";

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

      <header className="mt-5 sm:mt-6">
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Why exosomes are changing Skincare
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Exosomes are microscopic messengers that help skin cells regenerate
          faster.
        </p>
      </header>
    </div>
  );
}
