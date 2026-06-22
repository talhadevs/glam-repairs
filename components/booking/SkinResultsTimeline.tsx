const milestones = [
  {
    period: "Week 1",
    title: "Skin adjustments",
    description: "Your skin starts adapting to the personalized routine.",
  },
  {
    period: "Month 1",
    title: "Visible improvements",
    description: "Texture becomes smoother and redness starts reducing",
  },
  {
    period: "Month 3",
    title: "Stable skin results",
    description: "Balanced healthier skin with long-term improvements",
  },
] as const;

export default function SkinResultsTimeline() {
  return (
    <ol className="relative m-0 list-none p-0">
      <div
        aria-hidden
        className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-brand-lavender sm:left-[0.75rem]"
      />

      {milestones.map((milestone) => (
        <li
          key={milestone.period}
          className="relative flex gap-3.5 pb-7 last:pb-0 sm:gap-4 sm:pb-8"
        >
          <span
            aria-hidden
            className="relative z-[1] mt-0.5 flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-full border-2 border-brand-light bg-white sm:h-6 sm:w-6"
          />

          <div className="min-w-0 pt-px">
            <p className="text-sm font-medium leading-none text-brand-light sm:text-[0.9375rem]">
              {milestone.period}
            </p>
            <h3 className="mt-2 text-sm font-semibold leading-snug text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]">
              {milestone.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-brand-gray sm:mt-2 sm:text-[0.8125rem]">
              {milestone.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
