type OnboardingProgressProps = {
  currentStep: number;
  totalSteps?: number;
  completed?: boolean;
};

export default function OnboardingProgress({
  currentStep,
  totalSteps = 10,
  completed = false,
}: OnboardingProgressProps) {
  const progress = Math.min(Math.max(currentStep / totalSteps, 0), 1);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-brand-gray sm:text-sm">
        <span>
          {completed
            ? `${totalSteps} of ${totalSteps} completed`
            : `${currentStep}/${totalSteps}`}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-lavender/50">
        <div
          className="onboarding-progress-fill h-full rounded-full bg-brand-light"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
