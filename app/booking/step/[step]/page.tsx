import { redirect } from "next/navigation";

type StepPageProps = {
  params: Promise<{ step: string }>;
};

/**
 * Booking funnel merged into onboarding.
 * Any old /booking/step/N bookmark lands on the single flow start.
 */
export default async function BookingStepPage({ params }: StepPageProps) {
  await params;
  redirect("/onboarding/step/1");
}
