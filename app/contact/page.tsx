import type { Metadata } from "next";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactSection from "@/components/contact/ContactSection";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Contact Us | GlamRepairs",
  description:
    "Get in touch with Glam Repairs for questions about skin assessments and guidance plans.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        <ContactHeroSection />
        <ContactSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
