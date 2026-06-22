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
  4: {
    title: "Improve Areas | GlamRepairs Booking",
    description: "Select the face areas you would like to improve in your treatment program.",
  },
  5: {
    title: "Skin Tone | GlamRepairs Booking",
    description: "Select the color closest to your skin tone to personalize your treatment program.",
  },
  6: {
    title: "Skin Profile | GlamRepairs Booking",
    description: "See what balanced hydration and protection means for your skin profile.",
  },
  7: {
    title: "Daily Routine | GlamRepairs Booking",
    description: "Tell us about your daily skincare routine to personalize your treatment program.",
  },
  8: {
    title: "Skincare Products | GlamRepairs Booking",
    description: "Select the skincare products you currently use in your routine.",
  },
  9: {
    title: "K-Beauty Routine | GlamRepairs Booking",
    description: "Choose whether to add a Korean skincare routine to your personalized plan.",
  },
  10: {
    title: "Routine Steps | GlamRepairs Booking",
    description: "Choose how many steps you want in your Korean skincare routine.",
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
  const nextLabel =
    stepNumber === 3
      ? "Let's make it 100%"
      : stepNumber === BOOKING_FORM_STEPS
        ? "Finish"
        : "Next";

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
