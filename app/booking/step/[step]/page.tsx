import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import BookingStepContent from "@/components/booking/BookingStepContent";
import SkinSelfieBookingStep from "@/components/booking/SkinSelfieBookingStep";
import {
  BOOKING_FORM_STEPS,
  BOOKING_TOTAL_STEPS,
  getBookingStepProgress,
  mapLegacyBookingStep,
} from "@/components/booking/bookingConfig";
import OnboardingIntroNav from "@/components/onboarding/OnboardingIntroNav";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import {
  getBookingNextStepNumber,
  getBookingPrevStepNumber,
} from "@/lib/funnel/bookingFlow";

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
  11: {
    title: "K-Beauty Glow | GlamRepairs Booking",
    description: "Choose which K-beauty glow inspires you most for your personalized plan.",
  },
  12: {
    title: "Korean Ingredients | GlamRepairs Booking",
    description: "Pick the K-beauty ingredients you are curious about for your plan.",
  },
  13: {
    title: "Korean Skincare Products | GlamRepairs Booking",
    description: "Choose which Korean skincare products you are most excited to try.",
  },
  14: {
    title: "Exosomes | GlamRepairs Booking",
    description: "Tell us if you have heard about advanced skincare ingredients like exosomes.",
  },
  15: {
    title: "Why Exosomes | GlamRepairs Booking",
    description: "Learn why exosomes are changing skincare and how they support skin regeneration.",
  },
  16: {
    title: "Add Exosomes | GlamRepairs Booking",
    description: "Choose whether to add exosomes-powered care to your routine.",
  },
  17: {
    title: "Sunscreen | GlamRepairs Booking",
    description: "Tell us how often you wear sunscreen outdoors.",
  },
  18: {
    title: "Location | GlamRepairs Booking",
    description: "Share your location so we can tailor recommendations to your local climate.",
  },
  19: {
    title: "Sulfates | GlamRepairs Booking",
    description: "Tell us whether you use skincare products that contain sulfates.",
  },
  20: {
    title: "Antioxidants | GlamRepairs Booking",
    description: "Tell us if you have tried skincare products with antioxidants.",
  },
  21: {
    title: "Acids | GlamRepairs Booking",
    description: "Tell us if you have used skincare products with acids.",
  },
  22: {
    title: "Retinol & Vitamin C | GlamRepairs Booking",
    description: "Tell us if you are aware of the benefits of retinol and vitamin C for skin.",
  },
  23: {
    title: "Ingredients Fit | GlamRepairs Booking",
    description: "See how well your treatment program matches your hydration, sensitivity, and goals.",
  },
  24: {
    title: "Social Media | GlamRepairs Booking",
    description: "Tell us if you heard about Glam repair from social media.",
  },
  25: {
    title: "Cosmetologists | GlamRepairs Booking",
    description: "Learn how Glam repair was created in collaboration with cosmetologists.",
  },
  26: {
    title: "Additional Concerns | GlamRepairs Booking",
    description: "Select any additional skin concerns to personalize your treatment program.",
  },
  27: {
    title: "Moisturized Skin | GlamRepairs Booking",
    description: "Tell us whether you think your skin is well moisturized.",
  },
  28: {
    title: "Daytime Skin Concerns | GlamRepairs Booking",
    description: "Select what bothers your skin during the day.",
  },
  29: {
    title: "Skin Sensitivity | GlamRepairs Booking",
    description: "Tell us whether you feel your skin is sensitive.",
  },
  30: {
    title: "Skin Improvement | GlamRepairs Booking",
    description: "See how your treatment program fits your hydration, sensitivity, and goals.",
  },
  31: {
    title: "Sleep Habits | GlamRepairs Booking",
    description: "Tell us how much sleep you usually get.",
  },
  32: {
    title: "Water Intake | GlamRepairs Booking",
    description: "Tell us about your daily water intake.",
  },
  33: {
    title: "Stress Levels | GlamRepairs Booking",
    description: "Tell us how often you feel stressed and tense.",
  },
  34: {
    title: "Skincare Routine Time | GlamRepairs Booking",
    description: "Tell us how much time you spend on your daily skin care routine.",
  },
  35: {
    title: "Profile Ready | GlamRepairs Booking",
    description: "Review your personalized skin profile summary.",
  },
  36: {
    title: "Treatment Program Fit | GlamRepairs Booking",
    description: "See how well your treatment program fits your skin goals.",
  },
  37: {
    title: "Improvement Goals | GlamRepairs Booking",
    description: "Select what you hope Glam repair will help you improve.",
  },
  38: {
    title: "Skin Confidence Goals | GlamRepairs Booking",
    description: "Select what you would like when you feel great about your skin.",
  },
  39: {
    title: "Skincare Journey Feelings | GlamRepairs Booking",
    description: "Select how you want to feel during your glam skincare journey.",
  },
  40: {
    title: "Glam Goals | GlamRepairs Booking",
    description: "Select what you would like to achieve with glam.",
  },
  41: {
    title: "Statement Agreement | GlamRepairs Booking",
    description: "Rate how much you relate to a statement about finding skincare products.",
  },
  42: {
    title: "Statement Agreement | GlamRepairs Booking",
    description: "Rate how much you relate to a statement about skincare product pricing.",
  },
  43: {
    title: "Statement Agreement | GlamRepairs Booking",
    description: "Rate how much you relate to a statement about brand loyalty.",
  },
  44: {
    title: "Statement Agreement | GlamRepairs Booking",
    description: "Rate how much you relate to a statement about purchasing products due to hype.",
  },
  45: {
    title: "Statement Agreement | GlamRepairs Booking",
    description: "Rate how much you relate to a statement about applying skincare products correctly.",
  },
  46: {
    title: "Skin Condition Trend | GlamRepairs Booking",
    description: "See how skin condition can worsen without glam and start improving your routine.",
  },
  47: {
    title: "Special Event | GlamRepairs Booking",
    description: "Select if you have a special event coming up as motivation for your skincare goal.",
  },
  48: {
    title: "Event Date | GlamRepairs Booking",
    description: "Tell us when your special event is so we can keep it in mind for your journey.",
  },
  49: {
    title: "Goal Plan | GlamRepairs Booking",
    description: "See your predicted skin goal timeline and personalized plan progress.",
  },
  50: {
    title: "Skin Selfie | GlamRepairs Booking",
    description: "Take a well-lit selfie to analyze your skin safely and privately.",
  },
  51: {
    title: "Program Journey | GlamRepairs Booking",
    description: "See your current skin metrics and how your personalized program supports your goals.",
  },
  52: {
    title: "Keep Your Results | GlamRepairs Booking",
    description: "Enter your email to save your skin analysis results to your account.",
  },
  53: {
    title: "Your Name | GlamRepairs Booking",
    description: "Enter your name to personalize your booking experience.",
  },
  54: {
    title: "Your Skin, Elevated | GlamRepairs Booking",
    description:
      "Compare your before and after skin results with hydration and elasticity metrics.",
  },
  55: {
    title: "Scratch To Reveal | GlamRepairs Booking",
    description: "Scratch off the card to reveal your elevated skin result.",
  },
  56: {
    title: "Skin Results Timeline | GlamRepairs Booking",
    description:
      "See when most users notice skin adjustments, visible improvements, and stable results.",
  },
};

type StepPageProps = {
  params: Promise<{ step: string }>;
};

export async function generateMetadata({ params }: StepPageProps): Promise<Metadata> {
  const { step } = await params;
  const stepNumber = Number(step);
  const legacy = mapLegacyBookingStep(stepNumber);
  const metaStep = legacy ?? stepNumber;

  return (
    STEP_METADATA[metaStep] ?? {
      title: `Booking Step ${metaStep} | GlamRepairs`,
      description: "Complete your personalized booking.",
    }
  );
}

export default async function BookingStepPage({ params }: StepPageProps) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!Number.isInteger(stepNumber) || stepNumber < 1) {
    notFound();
  }

  // Old final URLs (57–59) → new last cards (54–56).
  const legacyStep = mapLegacyBookingStep(stepNumber);
  if (legacyStep !== null) {
    redirect(`/booking/step/${legacyStep}`);
  }

  if (stepNumber > BOOKING_FORM_STEPS) {
    notFound();
  }

  const progressStep = getBookingStepProgress(stepNumber);
  const prevStep = getBookingPrevStepNumber(stepNumber, {});
  const backHref =
    stepNumber === 1
      ? "/"
      : prevStep !== null && prevStep >= 1
        ? `/booking/step/${prevStep}`
        : `/booking/step/${stepNumber - 1}`;

  const nextStep = getBookingNextStepNumber(stepNumber, {});
  const nextHref =
    stepNumber === BOOKING_FORM_STEPS || nextStep > BOOKING_FORM_STEPS
      ? "/booking/report"
      : `/booking/step/${nextStep}`;
  const nextLabel =
    stepNumber === 3 ||
    stepNumber === 23 ||
    stepNumber === 30 ||
    stepNumber === 36 ||
    stepNumber === 46 ||
    stepNumber === 49
      ? "Let's make it 100%"
      : stepNumber === BOOKING_FORM_STEPS
        ? "See My Report"
        : "Next";

  if (stepNumber === 50) {
    return (
      <SkinSelfieBookingStep
        backHref={backHref}
        nextHref={nextHref}
        currentStep={progressStep}
        totalSteps={BOOKING_TOTAL_STEPS}
      />
    );
  }

  return (
    <OnboardingShell
      currentStep={progressStep}
      totalSteps={BOOKING_TOTAL_STEPS}
      footer={
        <OnboardingIntroNav
          backHref={backHref}
          nextHref={nextHref}
          nextLabel={nextLabel}
          bookingStep={stepNumber}
        />
      }
    >
      <BookingStepContent stepNumber={stepNumber} />
    </OnboardingShell>
  );
}
