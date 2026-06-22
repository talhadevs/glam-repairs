import SkinResultsTimeline from "@/components/booking/SkinResultsTimeline";

export default function SkinResultsTimelineStep() {
  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Skin results timeline
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Most users see visible improvements within 4-12 weeks
        </p>
      </header>

      <div className="mt-6 sm:mt-7">
        <SkinResultsTimeline />
      </div>
    </div>
  );
}
