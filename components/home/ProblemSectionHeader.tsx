"use client";

import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";

export default function ProblemSectionHeader() {
  return (
    <AnimatedSlideIn
      direction="left"
      className="-ml-2 max-w-xl sm:-ml-3 lg:-ml-5"
    >
      <header>
        <h2 className="font-serif text-[2rem] tracking-normal text-brand-primary sm:text-[3.25rem] lg:text-[3.5rem]">
          THE PROBLEM
        </h2>
        <p className="mt-1 text-lg font-light tracking-tight text-brand-gray sm:mt-2 sm:text-2xl lg:text-[1.75rem]">
          Good skin advice shouldn&apos;t require a clinic appointment.
        </p>
      </header>
    </AnimatedSlideIn>
  );
}
