import SkinElevatedMetricsGrid from "@/components/booking/SkinElevatedMetricsGrid";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";

const beforeImage = "/svgs/Rectangle 3467729.svg";
const afterImage = "/svgs/Rectangle 3467730.svg";

export default function SkinElevatedStep() {
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
    </div>
  );
}
