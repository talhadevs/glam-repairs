import AnimatedCount from "@/components/booking/AnimatedCount";
import MapWithAnimatedDots from "@/components/booking/MapWithAnimatedDots";

export default function NotAloneStep() {
  return (
    <div>
      <MapWithAnimatedDots />

      <div className="mt-6 sm:mt-8">
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          You&apos;re not alone!
        </h1>
        <p className="mt-3 font-serif text-[1.35rem] leading-snug text-brand-ink sm:text-[1.5rem]">
          Glam has helped{" "}
          <AnimatedCount
            value={23428}
            className="inline-block text-brand-primary"
          />{" "}
          people with similar concerns
        </p>
      </div>
    </div>
  );
}
