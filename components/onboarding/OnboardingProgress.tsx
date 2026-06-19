type OnboardingProgressProps = {
  currentStep: number;
  totalSteps?: number;
};

export default function OnboardingProgress({
  currentStep,
  totalSteps = 10,
}: OnboardingProgressProps) {
  const progress = Math.min(Math.max(currentStep / totalSteps, 0), 1);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-brand-gray sm:text-sm">
        <span>
          {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-lavender/50">
        <div
          className="h-full rounded-full bg-brand-light transition-[width] duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
