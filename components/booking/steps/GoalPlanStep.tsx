import GoalProgressChart from "@/components/booking/GoalProgressChart";

export default function GoalPlanStep() {
  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-snug text-brand-ink sm:text-[2rem]">
          The last plan you&apos;ll ever need for normal skin type
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          We predict you&apos;ll reach goal by Jul 10 just in time for the
          holiday
        </p>
      </header>

      <div className="mt-6 flex justify-center sm:mt-7">
        <GoalProgressChart />
      </div>
    </div>
  );
}
