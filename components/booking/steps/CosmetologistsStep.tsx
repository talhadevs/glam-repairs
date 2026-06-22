import Image from "next/image";

const cosmetologistImage = "/svgs/women_dr.svg";

export default function CosmetologistsStep() {
  return (
    <div>
      <div className="relative aspect-[386/480] w-full overflow-hidden rounded-2xl">
        <Image
          src={cosmetologistImage}
          alt="Cosmetologist in a white lab coat"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 32rem"
          className="object-cover object-top"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-lavender/20 via-white to-transparent px-4 pb-5 pt-14 sm:px-5 sm:pb-6 sm:pt-16">
          <h1 className="mx-auto max-w-[16rem] text-center font-serif text-[1.65rem] leading-tight text-brand-ink sm:max-w-[18rem] sm:text-[1.85rem]">
            Created in collaboration with cosmetologists
          </h1>
        </div>
      </div>
    </div>
  );
}
