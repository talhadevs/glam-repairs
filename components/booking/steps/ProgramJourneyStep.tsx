import Image from "next/image";

import SkinMetricsPanel from "@/components/booking/SkinMetricsPanel";

const currentConcerns = [
  {
    label: "Enlarged pores",
    icon: "/svgs/Group 2085660843.svg",
  },
  {
    label: "Oiliness",
    icon: "/svgs/Group 2085660788.svg",
  },
] as const;

const programPoints = [
  "Based on your skin data",
  "Tailored for significant skin improvement",
  "Designed to provide long-lasting results through skincare guidance",
] as const;

function ConcernBadge({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11">
        <Image
          src={icon}
          alt=""
          width={44}
          height={44}
          className="h-9 w-auto object-contain sm:h-10"
        />
      </span>
      <span className="max-w-[4.5rem] text-[10px] leading-snug text-brand-ink sm:max-w-[5rem] sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export default function ProgramJourneyStep() {
  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Do you have a special event coming up?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
          Having something to look forward to can be a great motivator for
          reaching your goal
        </p>
      </header>

      <div className="mt-5 sm:mt-6">
        <SkinMetricsPanel />
      </div>

      <div className="mt-5 sm:mt-6">
        <p className="text-sm text-brand-gray sm:text-[0.9375rem]">You are here</p>

        <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {currentConcerns.map((concern) => (
              <ConcernBadge
                key={concern.label}
                label={concern.label}
                icon={concern.icon}
              />
            ))}
          </div>

          <svg
            aria-hidden
            viewBox="0 0 24 16"
            className="h-3 w-6 shrink-0 text-brand-gray/70 sm:h-3.5 sm:w-7"
            fill="none"
          >
            <path
              d="M1 8H20M20 8L14 2M20 8L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border-light/60 bg-white shadow-sm sm:h-12 sm:w-12">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="h-5 w-5 text-brand-light sm:h-5 sm:w-5"
                fill="currentColor"
              >
                <path d="M10 1.5L11.6 7.2H17.5L12.7 10.6L14.3 16.3L10 12.9L5.7 16.3L7.3 10.6L2.5 7.2H8.4L10 1.5Z" />
              </svg>
            </span>
            <span className="max-w-[5.5rem] text-[10px] leading-snug text-brand-ink sm:max-w-[6rem] sm:text-[11px]">
              Let&apos;s get dream skin
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-7">
        <h2 className="font-serif text-[1.35rem] leading-snug text-brand-ink sm:text-[1.5rem]">
          Your program is here
        </h2>

        <ol className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
          {programPoints.map((point, index) => (
            <li key={point} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-[11px] font-medium text-white sm:h-7 sm:w-7 sm:text-xs">
                {index + 1}
              </span>
              <span className="pt-0.5 text-sm leading-snug text-brand-ink sm:text-[0.9375rem]">
                {point}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
