import { redirect } from "next/navigation";

/** Booking funnel merged into onboarding — single flow only. */
export default function BookingIndexPage() {
  redirect("/onboarding/step/1");
}
