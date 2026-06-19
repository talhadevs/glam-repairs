import type { Metadata } from "next";

import { notFound } from "next/navigation";

import OnboardingIntroNav from "@/components/onboarding/OnboardingIntroNav";

import OnboardingShell from "@/components/onboarding/OnboardingShell";

import OnboardingStepContent from "@/components/onboarding/OnboardingStepContent";

import ConsentStep from "@/components/onboarding/steps/ConsentStep";

import PlanSelectionStep from "@/components/onboarding/steps/PlanSelectionStep";

import { UploadPhotosFooter } from "@/components/onboarding/steps/UploadPhotosStep";

import {
  getFormStepProgress,
  ONBOARDING_FORM_STEPS,
  ONBOARDING_TOTAL_STEPS,
} from "@/components/onboarding/onboardingConfig";

const TOTAL_STEPS = ONBOARDING_TOTAL_STEPS;
const STEP_METADATA: Record<number, Metadata> = {
  1: {
    title: "Skin Zone Selection | GlamRepairs",
    description: "Select the areas of your skin you are most concerned about.",
  },
  2: {
    title: "Primary Concern | GlamRepairs",
    description: "Select your main skin concern to personalize your guidance.",
  },
  3: {
    title: "Concern Duration | GlamRepairs",
    description: "Tell us how long you have been dealing with your skin concern.",
  },
  4: {
    title: "About You | GlamRepairs",
    description: "Share a few basics to personalize your skin guidance report.",
  },
  5: {
    title: "Your Current Routine | GlamRepairs",
    description: "Tell us about your current skincare routine and products.",
  },
  6: {
    title: "Lifestyle | GlamRepairs",
    description: "Share sleep, water, stress, and diet habits that affect your skin.",
  },
  7: {
    title: "Photo Guide | GlamRepairs",
    description: "Learn how to take clear photos for an accurate skin assessment.",
  },
  8: {
    title: "Photo Upload | GlamRepairs",
    description: "Upload front face and concern area photos in clear, natural light.",
  },
  9: {
    title: "Plan Selection | GlamRepairs",
    description: "Choose your Clarity or Transform plan to continue your skin assessment.",
  },
  10: {
    title: "Consent and Trust | GlamRepairs",
    description: "Review and agree to our privacy and photo usage terms.",
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
      title: `Step ${stepNumber} | GlamRepairs`,
      description: "Complete your personalized skin guidance assessment.",
    }
  );
}



export default async function OnboardingStepPage({ params }: StepPageProps) {

  const { step } = await params;

  const stepNumber = Number(step);



  if (!Number.isInteger(stepNumber) || stepNumber < 1 || stepNumber > ONBOARDING_FORM_STEPS) {

    notFound();

  }



  const progressStep = getFormStepProgress(stepNumber);



  const backHref =

    stepNumber === 1 ? "/onboarding/program" : `/onboarding/step/${stepNumber - 1}`;

  const nextHref =

    stepNumber < ONBOARDING_FORM_STEPS

      ? `/onboarding/step/${stepNumber + 1}`

      : "/";



  if (stepNumber === 9) {
    return (
      <PlanSelectionStep backHref={backHref} nextHref={nextHref} />
    );
  }

  if (stepNumber === 10) {
    return (
      <ConsentStep backHref={backHref} nextHref="/onboarding/complete" />
    );
  }



  return (

    <OnboardingShell

      currentStep={progressStep}

      totalSteps={TOTAL_STEPS}

      footer={

        stepNumber === 8 ? (

          <UploadPhotosFooter backHref={backHref} nextHref={nextHref} />

        ) : (

          <OnboardingIntroNav

            backHref={backHref}

            nextHref={nextHref}

            nextLabel={stepNumber === TOTAL_STEPS ? "Finish" : "Next"}

          />

        )

      }

    >

      <OnboardingStepContent stepNumber={stepNumber} />

    </OnboardingShell>

  );

}
