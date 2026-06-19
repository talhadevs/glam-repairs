import Link from "next/link";

type OnboardingIntroNavProps = {
  backHref: string;
  nextHref: string;
  nextLabel?: string;
};

export default function OnboardingIntroNav({
  backHref,
  nextHref,
  nextLabel = "Next",
}: OnboardingIntroNavProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href={backHref}
        aria-label="Go back"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-border-light bg-white text-brand-gray shadow-sm transition-opacity hover:opacity-80"
      >
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <Link
        href={nextHref}
        className="subscribe-fill-btn rounded-full bg-brand-light px-10 py-3 text-xs font-normal uppercase tracking-[0.15em] text-white sm:px-12 sm:py-3.5 sm:text-sm"
      >
        {nextLabel}
      </Link>
    </div>
  );
}
