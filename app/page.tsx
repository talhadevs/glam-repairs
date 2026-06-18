import CeoSection from "@/components/home/CeoSection";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SkinAssessment from "@/components/home/SkinAssessment";
import TrustPrivacySection from "@/components/home/TrustPrivacySection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SkinAssessment />
      <ProblemSection />
      <WhatWeDoSection />
      <TrustPrivacySection />
      <CeoSection />
    </>
  );
}
