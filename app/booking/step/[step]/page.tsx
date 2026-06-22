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
    title: "PDRN | GlamRepairs Booking",
    description: "Tell us if you have heard of PDRN, the K-beauty favorite for skin repair and glow.",
  },
  15: {
    title: "What is PDRN? | GlamRepairs Booking",
    description: "Learn how PDRN supports skin repair, hydration, and elasticity.",
  },
  16: {
    title: "Add PDRN | GlamRepairs Booking",
    description: "Choose whether to add PDRN to your personalized treatment plan.",
  },
  17: {
    title: "Exosomes | GlamRepairs Booking",
    description: "Tell us if you have heard about advanced skincare ingredients like exosomes.",
  },
  18: {
    title: "Why Exosomes | GlamRepairs Booking",
    description: "Learn why exosomes are changing skincare and how they support skin regeneration.",
  },
  19: {
    title: "Add Exosomes | GlamRepairs Booking",
    description: "Choose whether to add exosomes-powered care to your routine.",
  },
  20: {
    title: "Sunscreen | GlamRepairs Booking",
    description: "Tell us how often you wear sunscreen outdoors.",
  },
  21: {
    title: "Location | GlamRepairs Booking",
    description: "Share your location so we can tailor recommendations to your local climate.",
  },
  22: {
    title: "Sulfates | GlamRepairs Booking",
    description: "Tell us whether you use skincare products that contain sulfates.",
  },
  23: {
    title: "Antioxidants | GlamRepairs Booking",
    description: "Tell us if you have tried skincare products with antioxidants.",
  },
  24: {
    title: "Acids | GlamRepairs Booking",
    description: "Tell us if you have used skincare products with acids.",
  },
  25: {
    title: "Retinol & Vitamin C | GlamRepairs Booking",
    description: "Tell us if you are aware of the benefits of retinol and vitamin C for skin.",
  },
  26: {
    title: "Ingredients Fit | GlamRepairs Booking",
    description: "See how well your treatment program matches your hydration, sensitivity, and goals.",
  },
  27: {
    title: "Social Media | GlamRepairs Booking",
    description: "Tell us if you heard about Glam repair from social media.",
  },
  28: {
    title: "Cosmetologists | GlamRepairs Booking",
    description: "Learn how Glam repair was created in collaboration with cosmetologists.",
  },
  29: {
    title: "Additional Concerns | GlamRepairs Booking",
    description: "Select any additional skin concerns to personalize your treatment program.",
  },
  30: {
    title: "Moisturized Skin | GlamRepairs Booking",
    description: "Tell us whether you think your skin is well moisturized.",
  },
  31: {
    title: "Daytime Skin Concerns | GlamRepairs Booking",
    description: "Select what bothers your skin during the day.",
  },
  32: {
    title: "Skin Sensitivity | GlamRepairs Booking",
    description: "Tell us whether you feel your skin is sensitive.",
  },
  33: {
    title: "Skin Improvement | GlamRepairs Booking",
    description: "See how your treatment program fits your hydration, sensitivity, and goals.",
  },
  34: {
    title: "Sleep Habits | GlamRepairs Booking",
    description: "Tell us how much sleep you usually get.",
  },
  35: {
    title: "Water Intake | GlamRepairs Booking",
    description: "Tell us about your daily water intake.",
  },
  36: {
    title: "Stress Levels | GlamRepairs Booking",
    description: "Tell us how often you feel stressed and tense.",
  },
  37: {
    title: "Skincare Routine Time | GlamRepairs Booking",
    description: "Tell us how much time you spend on your daily skin care routine.",
  },
  38: {
    title: "Profile Ready | GlamRepairs Booking",
    description: "Review your personalized skin profile summary.",
  },
  39: {
    title: "Treatment Program Fit | GlamRepairs Booking",
    description: "See how well your treatment program fits your skin goals.",
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
    stepNumber === 3 || stepNumber === 26 || stepNumber === 33 || stepNumber === 39
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
