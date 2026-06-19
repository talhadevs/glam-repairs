"use client";

import Image from "next/image";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import ExpertInsightChart from "@/components/home/ExpertInsightChart";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import ConcernPill from "@/components/home/ConcernPill";
import SkinAssessmentCta from "@/components/home/SkinAssessmentCta";

const pillBaseClassName =
  "border-white/80 py-2 pl-3 pr-4 !shadow-none backdrop-blur-none sm:py-2.5 sm:pl-3.5 sm:pr-5";

const concernPills = [
  {
    label: "ACNE SCARS",
    icon: "/svgs/Vector (5).svg",
    widthClassName: "w-[10.5rem] sm:w-[11.75rem]",
    className: `${pillBaseClassName} !bg-white`,
  },
  {
    label: "BLACK HEADS",
    icon: "/svgs/Group 2085660670.svg",
    widthClassName: "w-[11.75rem] sm:w-[13rem]",
    className: `${pillBaseClassName} bg-brand-cream`,
  },
  {
    label: "PIMPLES",
    icon: "/svgs/Vector (6).svg",
    widthClassName: "w-[9.5rem] sm:w-[10.5rem]",
    className: `${pillBaseClassName} bg-brand-cream`,
  },
];

export default function WhatYouGetSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="w-full">
        <AnimatedSlideIn
          direction="left"
          className="max-w-3xl px-6 sm:px-10 lg:px-16 xl:px-20"
        >
          <header>
            <h2 className="font-serif text-[2.5rem] tracking-normal text-brand-primary sm:text-[3.25rem] lg:text-[3.5rem]">
              WHAT YOU GET
            </h2>
            <p className="mt-2 text-base font-light leading-snug tracking-tight text-brand-gray sm:mt-2.5 sm:text-lg lg:text-xl">
              Our skin guidance process is designed to make professional skincare
              support more accessible. Share your concerns, upload clear photos,
              and receive a personalized skin report with routine recommendations,
              lifestyle tips, and guidance on the next steps for your skin journey.
            </p>
          </header>
        </AnimatedSlideIn>

        <div className="mt-10 grid gap-4 px-6 sm:mt-12 sm:px-10 lg:mt-14 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5 lg:px-16 xl:px-20">
          <AnimatedSlideIn
            direction="up"
            className="lg:col-span-8 lg:row-start-1"
          >
            <article className="relative min-h-[20rem] overflow-hidden rounded-[20px] bg-brand-cream sm:min-h-[23rem] lg:min-h-[21rem]">
              <p className="absolute left-5 top-5 z-10 font-serif text-xl leading-[1.15] text-brand-primary sm:left-6 sm:top-6 sm:text-2xl lg:left-8 lg:top-8 lg:text-[1.75rem]">
                <span className="block whitespace-nowrap">Get rid of your skin</span>
                <span className="block whitespace-nowrap">issues with science</span>
                <span className="block whitespace-nowrap">and self-care</span>
              </p>

              <div className="relative mx-auto h-[15rem] w-full translate-x-3 sm:h-[18rem] sm:translate-x-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-8 lg:mx-0 lg:h-auto lg:translate-x-6">
                <Image
                  src="/svgs/men.svg"
                  alt="Man examining his skin in the mirror"
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-contain object-bottom lg:scale-105"
                />
              </div>

              <div className="absolute right-5 top-[54%] z-10 flex -translate-y-1/2 flex-col items-end gap-3.5 sm:right-6 sm:top-[56%] sm:gap-4 lg:right-8 lg:top-[58%]">
                {concernPills.map((pill, index) => (
                  <AnimatedSlideIn
                    key={pill.label}
                    direction="right"
                    delay={index * 120}
                  >
                    <ConcernPill
                      label={pill.label}
                      icon={pill.icon}
                      widthClassName={pill.widthClassName}
                      iconWrapClassName="bg-transparent"
                      className={pill.className}
                    />
                  </AnimatedSlideIn>
                ))}
              </div>
            </article>
          </AnimatedSlideIn>

          <AnimatedSlideIn
            direction="up"
            delay={150}
            className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1"
          >
            <article className="relative aspect-[433/610] min-h-[22rem] overflow-hidden rounded-[20px] sm:min-h-[26rem] lg:h-full lg:min-h-0">
              <BeforeAfterSlider />
            </article>
          </AnimatedSlideIn>

          <AnimatedSlideIn
            direction="up"
            delay={200}
            className="lg:col-span-5 lg:col-start-1 lg:row-start-2"
          >
            <article className="relative min-h-[14rem] overflow-hidden rounded-[20px] bg-brand-accent px-8 py-7 sm:min-h-[16rem] sm:px-9 sm:py-8 lg:min-h-[17rem] lg:px-10">
              <p className="relative z-10 w-[43%] text-[15px] font-medium leading-[1.25] text-white lg:text-[17px]">
                Our experts help you focus on what works, so you can make informed
                decisions and achieve healthier skin.
              </p>

              <div className="pointer-events-none absolute bottom-0 right-0 h-[92%] w-[86%] translate-x-4 sm:translate-x-5 lg:h-[94%] lg:w-[84%] lg:translate-x-6">
                <ExpertInsightChart />
              </div>
            </article>
          </AnimatedSlideIn>

          <AnimatedSlideIn direction="up" delay={250} className="lg:col-span-3 lg:col-start-6 lg:row-start-2">
            <article className="relative flex h-full min-h-[14rem] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-[#662D91] px-5 py-6 text-center sm:min-h-[16rem] sm:py-7 lg:min-h-[17rem]">
              <Image
                src="/svgs/bgg.svg"
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover object-center"
              />
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="font-serif text-3xl text-white sm:text-4xl">
                  Skin Analysis
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/90 sm:text-base">
                  Real advice. Real skin. Real results.
                </p>
                <SkinAssessmentCta
                  variant="analysis"
                  className="mt-5 sm:mt-6"
                />
              </div>
            </article>
          </AnimatedSlideIn>
        </div>
      </div>
    </section>
  );
}
