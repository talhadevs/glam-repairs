import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BookingStepContent from "@/components/booking/BookingStepContent";
import {
  BOOKING_FORM_STEPS,
  BOOKING_TOTAL_STEPS,
  getBookingStepProgress,
} from "@/components/booking/bookingConfig";
import OnboardingIntroNav from "@/components/onboarding/OnboardingIntroNav";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

const STEP_METADATA: Record<number, Metadata> = {
  1: {
    title: "Skin Type | GlamRepairs Booking",
    description: "Select your skin type to personalize your treatment program.",
  },
  2: {
    title: "You're Not Alone | GlamRepairs Booking",
    description: "Join thousands who have found help with similar skin concerns.",
  },
  3: {
    title: "Treatment Fit | GlamRepairs Booking",
    description: "See how well your personalized treatment program matches your skin profile.",
  },
};

type StepPageProps = {
  params: Promise<{ step: string }>;
};

export async function generateMetadata({ params }: StepPageProps): Promise<Metadata> {
  const { step } = await params;
  const stepNumber = Number(step);

  return (
    STEP_METADATA[stepNumber] ?? {
      title: `Booking Step ${stepNumber} | GlamRepairs`,
      description: "Complete your personalized booking.",
    }
  );
}

export default async function BookingStepPage({ params }: StepPageProps) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!Number.isInteger(stepNumber) || stepNumber < 1 || stepNumber > BOOKING_FORM_STEPS) {
    notFound();
  }

  const progressStep = getBookingStepProgress(stepNumber);
  const backHref = stepNumber === 1 ? "/" : `/booking/step/${stepNumber - 1}`;
  const nextHref =
    stepNumber < BOOKING_FORM_STEPS ? `/booking/step/${stepNumber + 1}` : "/";
  const nextLabel = stepNumber === 3 ? "Let's make it 100%" : "Next";

  return (
    <OnboardingShell
      currentStep={progressStep}
      totalSteps={BOOKING_TOTAL_STEPS}
      footer={
        <OnboardingIntroNav
          backHref={backHref}
          nextHref={nextHref}
          nextLabel={nextLabel}
        />
      }
    >
      <BookingStepContent stepNumber={stepNumber} />
    </OnboardingShell>
  );
}
