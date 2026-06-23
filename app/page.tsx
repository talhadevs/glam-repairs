import CeoSection from "@/components/home/CeoSection";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SkinAssessment from "@/components/home/SkinAssessment";
import TrustPrivacySection from "@/components/home/TrustPrivacySection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import WhatYouGetSection from "@/components/home/WhatYouGetSection";
import PricingSection from "@/components/pricing/PricingSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SkinAssessment />
      <ProblemSection />
      <WhatWeDoSection />
      <TrustPrivacySection />
      <CeoSection />
      <WhatYouGetSection />
      <PricingSection
        title="Start free. Glow on your own terms."
        subtitle="No clinic. No commute. Just clarity."
        showTrustLine
      />
      <FaqSection />
      <Footer />
    </>
  );
}
