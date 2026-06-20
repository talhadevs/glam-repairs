import Link from "next/link";

type OnboardingNavProps = {
  backHref?: string;
  nextHref?: string;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
};

export default function OnboardingNav({
  backHref,
  nextHref,
  onNext,
  nextLabel = "Next →",
  backLabel = "← Back",
  isNextDisabled = false,
}: OnboardingNavProps) {
  const nextClasses =
    "cursor-pointer text-sm font-medium text-brand-primary transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex items-center justify-between gap-4">
      {backHref ? (
        <Link
          href={backHref}
          className="cursor-pointer text-sm font-medium text-brand-gray transition-opacity hover:opacity-80"
        >
          {backLabel}
        </Link>
      ) : (
        <span className="text-sm font-medium text-transparent">{backLabel}</span>
      )}

      {nextHref ? (
        <Link href={nextHref} className={nextClasses} aria-disabled={isNextDisabled}>
          {nextLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className={nextClasses}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
