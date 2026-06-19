import type { ReactNode } from "react";
import OnboardingNav from "@/components/onboarding/OnboardingNav";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";

type OnboardingShellProps = {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  backHref?: string;
  nextHref?: string;
  onNext?: () => void;
  nextLabel?: string;
  footer?: ReactNode;
  showProgress?: boolean;
};

export default function OnboardingShell({
  children,
  currentStep,
  totalSteps = 10,
  backHref,
  nextHref,
  onNext,
  nextLabel,
  footer,
  showProgress = true,
}: OnboardingShellProps) {
  const isStep = typeof currentStep === "number";

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-brand-purple-soft via-white to-brand-lavender/30 px-4 py-10 sm:px-6">
      <div className="w-full max-w-[28rem] rounded-[2rem] border border-brand-lavender/60 bg-gradient-to-b from-brand-purple-soft/80 via-white to-brand-lavender/20 px-7 pb-9 pt-8 shadow-sm sm:max-w-[32rem] sm:px-9 sm:pb-10 sm:pt-9">
        {isStep && showProgress && (
          <div className="mb-7 sm:mb-8">
            <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        {children}

        {(footer || isStep) && (
          <div className="mt-8 sm:mt-9">
            {footer ??
              (isStep ? (
                <OnboardingNav
                  backHref={backHref}
                  nextHref={nextHref}
                  onNext={onNext}
                  nextLabel={nextLabel}
                />
              ) : null)}
          </div>
        )}
      </div>
    </div>
  );
}
