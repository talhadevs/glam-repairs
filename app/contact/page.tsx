import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

export const metadata: Metadata = {
  title: "Contact Us | GlamRepairs",
  description:
    "Get in touch with Glam Repairs for questions about skin assessments and guidance plans.",
};

export default function ContactPage() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <ContactSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
