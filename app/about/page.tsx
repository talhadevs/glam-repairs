import type { Metadata } from "next";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import OurStorySection from "@/components/about/OurStorySection";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "About Us | GlamRepairs",
  description:
    "Glam Repairs bridges professional aesthetics expertise and everyday skincare decisions with expert-reviewed, personalized guidance.",
};

export default function AboutPage() {
  return (
    <>
      <main>
        <AboutHeroSection />
        <OurStorySection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
