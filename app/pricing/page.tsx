import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import FaqSection from "@/components/home/FaqSection";
import Header from "@/components/home/Header";
import FeaturesComparisonSection from "@/components/pricing/FeaturesComparisonSection";
import PricingSection from "@/components/pricing/PricingSection";

export const metadata: Metadata = {
  title: "Pricing | GlamRepairs",
  description:
    "Choose a Glam Repairs skin guidance plan that fits your needs.",
};

export default function PricingPage() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <PricingSection />
        <FeaturesComparisonSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
