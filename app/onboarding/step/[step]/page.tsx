import type { Metadata } from "next";

import { notFound } from "next/navigation";

import OnboardingIntroNav from "@/components/onboarding/OnboardingIntroNav";

import OnboardingShell from "@/components/onboarding/OnboardingShell";

import OnboardingStepContent from "@/components/onboarding/OnboardingStepContent";



const TOTAL_STEPS = 10;



type StepPageProps = {

  params: Promise<{ step: string }>;

};



export async function generateMetadata({ params }: StepPageProps): Promise<Metadata> {

  const { step } = await params;

  const stepNumber = Number(step);



  if (stepNumber === 1) {

    return {

      title: "About You | GlamRepairs",

      description: "Tell us about yourself to begin your skin guidance assessment.",

    };

  }



  if (stepNumber === 2) {

    return {

      title: "Gender | GlamRepairs",

      description: "Tell us how you identify to personalize your skin guidance.",

    };

  }



  if (stepNumber === 3) {

    return {

      title: "Age | GlamRepairs",

      description: "Share your age range to help personalize your skin guidance.",

    };

  }



  return {

    title: `Step ${stepNumber} | GlamRepairs`,

    description: "Complete your personalized skin guidance assessment.",

  };

}



export default async function OnboardingStepPage({ params }: StepPageProps) {

  const { step } = await params;

  const stepNumber = Number(step);



  if (!Number.isInteger(stepNumber) || stepNumber < 1 || stepNumber > TOTAL_STEPS) {

    notFound();

  }



  const backHref =

    stepNumber === 1 ? "/onboarding/program" : `/onboarding/step/${stepNumber - 1}`;

  const nextHref =

    stepNumber < TOTAL_STEPS

      ? `/onboarding/step/${stepNumber + 1}`

      : "/";



  return (

    <OnboardingShell

      currentStep={stepNumber}

      totalSteps={TOTAL_STEPS}

      footer={

        <OnboardingIntroNav

          backHref={backHref}

          nextHref={nextHref}

          nextLabel={stepNumber === TOTAL_STEPS ? "Finish" : "Next"}

        />

      }

    >

      <OnboardingStepContent stepNumber={stepNumber} />

    </OnboardingShell>

  );

}

