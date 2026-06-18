"use client";

import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import Button from "@/components/ui/Button";

export default function HeroAssessmentButton() {
  return (
    <AnimatedSlideIn
      direction="up"
      className="mt-8 w-full max-w-sm sm:mt-10 sm:w-auto sm:max-w-none"
    >
      <Button variant="cta" className="w-full sm:w-auto">
        GET MY SKIN ASSESSMENT
      </Button>
    </AnimatedSlideIn>
  );
}
