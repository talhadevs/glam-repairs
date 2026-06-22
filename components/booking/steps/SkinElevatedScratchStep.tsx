import ScratchCard from "@/components/booking/ScratchCard";

const revealImage = "/svgs/Rectangle 3467730.svg";

export default function SkinElevatedScratchStep() {
  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Your skin, elevated
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          See the radiant difference
        </p>
      </header>

      <div className="mx-auto mt-6 aspect-[233/306] w-full max-w-[16.25rem] sm:mt-7">
        <ScratchCard revealSrc={revealImage} className="h-full w-full" />
      </div>
    </div>
  );
}
