import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import FaqSection from "@/components/home/FaqSection";
import Navbar from "@/components/home/Navbar";
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
      <section className="relative bg-white">
        <Navbar theme="light" />
        <div className="h-[4.5rem] md:h-20 xl:h-24" aria-hidden />
      </section>
      <main>
        <PricingSection />
        <FeaturesComparisonSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
