"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, type ReactNode } from "react";
import FunnelStepGuard from "@/components/funnel/FunnelStepGuard";
import ApplyPlanFromQuery from "@/components/onboarding/ApplyPlanFromQuery";
import OnboardingNav from "@/components/onboarding/OnboardingNav";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import { ONBOARDING_TOTAL_STEPS } from "@/components/onboarding/onboardingConfig";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";
import { useFunnelProgressSave } from "@/lib/funnel/useFunnelProgressSave";

type OnboardingShellProps = {
  children: ReactNode;
  /** Progress-bar index — same as URL `/onboarding/step/N`. */
  currentStep?: number;
  totalSteps?: number;
  backHref?: string;
  nextHref?: string;
  onNext?: () => void;
  nextLabel?: string;
  footer?: ReactNode;
  showProgress?: boolean;
  progressCompleted?: boolean;
};

export default function OnboardingShell({
  children,
  currentStep,
  totalSteps = ONBOARDING_TOTAL_STEPS,
  backHref,
  nextHref,
  onNext,
  nextLabel,
  footer,
  showProgress = true,
  progressCompleted = false,
}: OnboardingShellProps) {
  const pathname = usePathname();
  const ensureSessionId = useFunnelStore((state) => state.ensureSessionId);
  useFunnelProgressSave();
  const showProgressBar = showProgress && typeof currentStep === "number";
  const showFooter = Boolean(
    footer || (typeof currentStep === "number" && backHref),
  );

  const funnelFlow = pathname.startsWith("/booking")
    ? ("booking" as const)
    : pathname.startsWith("/onboarding/step")
      ? ("onboarding" as const)
      : null;

  const guardStep = currentStep;

  useEffect(() => {
    ensureSessionId();
  }, [ensureSessionId]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-brand-purple-soft via-white to-brand-lavender/30 px-4 py-10 sm:px-6">
      <Suspense fallback={null}>
        <ApplyPlanFromQuery />
      </Suspense>
      {funnelFlow && typeof guardStep === "number" && guardStep >= 1 ? (
        <FunnelStepGuard flow={funnelFlow} step={guardStep} />
      ) : null}
      <div className="onboarding-card w-full max-w-[28rem] rounded-[2rem] border border-brand-lavender/60 bg-gradient-to-b from-brand-purple-soft/80 via-white to-brand-lavender/20 px-7 pb-9 pt-8 shadow-sm sm:max-w-[32rem] sm:px-9 sm:pb-10 sm:pt-9">
        {showProgressBar && (
          <div className="mb-7 sm:mb-8">
            <OnboardingProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
              completed={progressCompleted}
            />
          </div>
        )}

        <div key={pathname} className="onboarding-step-enter relative z-20">
          {children}
        </div>

        {showFooter && (
          <div className="relative z-0 mt-8 sm:mt-9">
            {footer ??
              (backHref ? (
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
