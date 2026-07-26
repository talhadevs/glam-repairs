import { redirect } from "next/navigation";

/** Booking report retired — single onboarding flow ends at plan/WhatsApp. */
export default function BookingReportPage() {
  redirect("/onboarding/step/1");
}
