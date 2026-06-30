"use client";

import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";

export default function ProblemSectionHeader() {
  return (
    <AnimatedSlideIn
      direction="left"
      className="-ml-2 max-w-xl sm:-ml-3 lg:-ml-5"
    >
      <header>
        <h2 className="flex flex-wrap items-baseline gap-x-2 leading-none">
          <span className="font-sans font-normal tracking-[-0.03em] text-brand-accent text-[2.5rem] sm:text-[3.25rem] lg:text-[3.875rem]">
            The
          </span>
          <span className="font-serif italic text-brand-primary text-[2.25rem] sm:text-[2.75rem] lg:text-[3.375rem]">
            Problem
          </span>
        </h2>
        <p className="mt-3 font-sans font-normal tracking-[-0.02em] text-brand-ink text-lg sm:mt-4 sm:text-2xl lg:text-[2rem]">
          Good skin advice shouldn&apos;t require a clinic appointment.
        </p>
      </header>
    </AnimatedSlideIn>
  );
}
