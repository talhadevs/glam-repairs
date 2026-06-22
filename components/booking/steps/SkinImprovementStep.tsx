import AnimatedCount from "@/components/booking/AnimatedCount";
import SkinImprovementChart from "@/components/booking/SkinImprovementChart";

export default function SkinImprovementStep() {
  return (
    <div>
      <div className="flex justify-center">
        <SkinImprovementChart />
      </div>

      <h1 className="mt-5 font-serif text-[1.35rem] leading-snug text-brand-ink sm:mt-6 sm:text-[1.5rem]">
        Your treatment program is a{" "}
        <AnimatedCount value={93} className="inline-block text-brand-primary" duration={1600} />
        % fit to you thanks to hydration, sensitivity & goal
      </h1>
    </div>
  );
}
