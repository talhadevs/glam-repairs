import type { Metadata } from "next";

import SkinGuidanceReport from "@/components/booking/SkinGuidanceReport";

export const metadata: Metadata = {
  title: "Skin Guidance Report | GlamRepairs",
  description: "Your personalized skin guidance report from Glam Repairs.",
};

export default function BookingReportPage() {
  return <SkinGuidanceReport />;
}
