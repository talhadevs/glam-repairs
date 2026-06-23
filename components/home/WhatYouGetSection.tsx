"use client";

import Image from "next/image";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import ExpertInsightChart from "@/components/home/ExpertInsightChart";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import ConcernPill from "@/components/home/ConcernPill";
import SkinAssessmentCta from "@/components/home/SkinAssessmentCta";

const pillBaseClassName =
  "border-white/80 py-1 pl-1.5 pr-2.5 !shadow-none backdrop-blur-none max-lg:[&>span:first-child]:!h-7 max-lg:[&>span:first-child]:!w-7 max-lg:[&>span:last-child]:!pl-2 max-lg:[&>span:last-child]:!text-[11px] sm:py-2.5 sm:pl-3.5 sm:pr-5 lg:py-2 lg:pl-3 lg:pr-4 lg:[&>span:first-child]:!h-9 lg:[&>span:first-child]:!w-10 lg:[&>span:last-child]:!text-[13px] lg:[&>span:last-child]:!pl-2.5";

const concernPills = [
  {
    label: "ACNE SCARS",
    icon: "/svgs/Vector (5).svg",
    widthClassName: "w-fit lg:w-[11.75rem]",
    className: `${pillBaseClassName} !bg-white`,
  },
  {
    label: "BLACK HEADS",
    icon: "/svgs/Group 2085660670.svg",
    widthClassName: "w-fit lg:w-[13rem]",
    className: `${pillBaseClassName} bg-brand-cream`,
  },
  {
    label: "PIMPLES",
    icon: "/svgs/Vector (6).svg",
    widthClassName: "w-fit lg:w-[10.5rem]",
    className: `${pillBaseClassName} bg-brand-cream`,
  },
];

export default function WhatYouGetSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-20 lg:py-24">
      <div className="w-full">
        <AnimatedSlideIn
          direction="left"
          className="max-w-3xl px-4 sm:px-10 lg:px-16 xl:px-20"
        >
          <header>
            <h2 className="font-serif text-[2rem] tracking-normal text-brand-primary sm:text-[3.25rem] lg:text-[3.5rem]">
              WHAT YOU GET
            </h2>
            <p className="mt-2 text-sm font-light leading-snug tracking-tight text-brand-gray sm:mt-2.5 sm:text-lg lg:text-xl">
              Our skin guidance process is designed to make professional skincare
              support more accessible. Share your concerns, upload clear photos,
              and receive a personalized skin report with routine recommendations,
              lifestyle tips, and guidance on the next steps for your skin journey.
            </p>
          </header>
        </AnimatedSlideIn>

        <div className="mt-8 grid gap-4 px-4 sm:mt-12 sm:px-10 lg:mt-14 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5 lg:px-16 xl:px-20">
          <AnimatedSlideIn
            direction="up"
            className="lg:col-span-8 lg:row-start-1"
          >
            <article className="relative flex h-[14.5rem] flex-col overflow-hidden rounded-[20px] bg-brand-cream sm:h-[16.5rem] lg:block lg:h-auto lg:min-h-[21rem]">
              <p className="relative z-10 shrink-0 px-4 pt-2 font-serif text-base leading-[1.05] text-brand-primary sm:px-6 sm:pt-2.5 sm:text-xl sm:leading-[1.1] lg:absolute lg:left-8 lg:top-8 lg:max-w-none lg:px-0 lg:pt-0 lg:text-[1.75rem] lg:leading-[1.15]">
                <span className="block sm:whitespace-nowrap">Get rid of your skin</span>
                <span className="block sm:whitespace-nowrap">issues with science</span>
                <span className="block sm:whitespace-nowrap">and self-care</span>
              </p>

              <div className="relative z-10 flex shrink-0 flex-col items-start gap-0.5 pl-6 pt-4 sm:gap-1 sm:pl-8 sm:pt-5 lg:absolute lg:right-8 lg:top-[58%] lg:-translate-y-1/2 lg:items-end lg:gap-4 lg:pl-0 lg:pt-0">
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

              <div className="pointer-events-none absolute inset-x-0 bottom-5 z-0 h-[9.25rem] -translate-x-1 sm:bottom-6 sm:h-[10.25rem] sm:translate-x-0 lg:inset-x-0 lg:bottom-0 lg:top-8 lg:h-auto lg:translate-x-6">
                <Image
                  src="/images,svgs/men.png"
                  alt="Man examining his skin in the mirror"
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-contain object-right-bottom max-lg:scale-[1.35] lg:scale-105 lg:object-bottom"
                />
              </div>
            </article>
          </AnimatedSlideIn>

          <AnimatedSlideIn
            direction="up"
            delay={150}
            className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1"
          >
            <article className="relative aspect-[433/610] min-h-[22rem] overflow-hidden rounded-[20px] sm:min-h-[26rem] lg:h-full lg:min-h-0">
              <BeforeAfterSlider
                beforeSrc="/svgs/Rectangle 3467729.svg"
                afterSrc="/svgs/Rectangle 3467730.svg"
                imagePosition="center"
                contentScale={1}
                unoptimized
              />
            </article>
          </AnimatedSlideIn>

          <AnimatedSlideIn
            direction="up"
            delay={200}
            className="lg:col-span-5 lg:col-start-1 lg:row-start-2"
          >
            <article className="relative min-h-[12rem] overflow-hidden rounded-[20px] bg-brand-accent px-5 py-6 sm:min-h-[16rem] sm:px-9 sm:py-8 lg:min-h-[17rem] lg:px-10">
              <p className="relative z-10 w-[52%] text-sm font-medium leading-[1.25] text-white sm:w-[43%] sm:text-[15px] lg:text-[17px]">
                Our experts help you focus on what works, so you can make informed
                decisions and achieve healthier skin.
              </p>

              <div className="pointer-events-none absolute bottom-0 right-0 h-[92%] w-[86%] translate-x-4 sm:translate-x-5 lg:h-[94%] lg:w-[84%] lg:translate-x-6">
                <ExpertInsightChart />
              </div>
            </article>
          </AnimatedSlideIn>

          <AnimatedSlideIn direction="up" delay={250} className="lg:col-span-3 lg:col-start-6 lg:row-start-2">
            <article className="relative flex h-full min-h-[12rem] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-brand-primary px-4 py-5 text-center sm:min-h-[16rem] sm:px-5 sm:py-7 lg:min-h-[17rem]">
              <Image
                src="/icons/shadow.svg"
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover object-center"
              />
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="font-serif text-2xl text-white sm:text-4xl">
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
