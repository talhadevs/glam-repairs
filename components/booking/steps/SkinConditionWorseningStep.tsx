import SkinConditionTrendChart from "@/components/booking/SkinConditionTrendChart";

export default function SkinConditionWorseningStep() {
  return (
    <div>
      <h1 className="font-serif text-[1.75rem] leading-snug text-brand-ink sm:text-[2rem]">
        Get rid of your skin issues with science and self-care
      </h1>

      <div className="mt-6 flex justify-center sm:mt-7">
        <SkinConditionTrendChart />
      </div>

      <p className="mt-5 font-serif text-[1.35rem] leading-snug text-brand-ink sm:mt-6 sm:text-[1.5rem]">
        Skin condition worsening
      </p>
    </div>
  );
}
