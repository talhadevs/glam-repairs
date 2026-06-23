"use client";

import Image from "next/image";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import ShareSkinStepImage from "@/components/home/ShareSkinStepImage";

const steps = [
  {
    image: "/images,svgs/woman-hand-.webp",
    alt: "Hands holding a phone with skin concern tags for acne scars, pimples, and blackheads",
    number: "01",
    title: "Share your Skin",
    description:
      "Fill out your skin intake form and upload clear photos of your concern areas. Takes under 5 minutes.",
  },
  {
    image: "/images,svgs/face_pimples.webp",
    alt: "Close-up face photo with expert markers for sebaceous filaments, pustules, papules, and acne scars",
    number: "02",
    title: "Experts Review",
    description:
      "Our qualified aesthetics expert manually reviews your submission - no AI shortcuts, no automated reports.",
  },
  {
    image: "/images,svgs/men_face_pimple.webp",
    alt: "Side profile with personalized skincare guidance for moisture, cleansing, and product recommendations",
    number: "03",
    title: "Your Personalized Plan",
    description:
      "Receive a detailed skin report, a step-by-step routine, ingredient and product-type guidance tailored to your skin, and follow-up support to track your progress.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedSlideIn
          direction="left"
          className="max-w-3xl sm:-ml-3 lg:-ml-5"
        >
          <header>
            <h2 className="font-serif text-[2rem] tracking-normal text-brand-primary sm:text-[3.25rem] lg:text-[3.5rem]">
              WHAT WE DO
            </h2>
            <p className="mt-1 text-lg font-light tracking-tight text-brand-gray sm:mt-2 sm:text-2xl lg:text-[1.75rem]">
              Real experts. Real photos. Real results.
            </p>
            <p className="mt-3 text-sm font-light leading-snug tracking-tighter text-brand-gray sm:mt-4 sm:text-lg lg:text-xl">
              You fill out a detailed intake form and share photos of your skin
              and concern areas. A certified aesthetics professional reviews
              everything manually. You receive a personalized assessment, a
              step-by-step routine, and follow-up support to make sure
              it&apos;s actually working.
            </p>
            <p className="mt-2 text-sm font-light leading-snug tracking-tighter text-brand-gray sm:mt-3 sm:text-lg lg:text-xl">
              This is what a clinic visit should feel like. Minus the commute,
              the cost, and the wait.
            </p>
          </header>
        </AnimatedSlideIn>

        <div className="mt-8 grid gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {steps.map((step, index) => (
            <AnimatedSlideIn
              key={step.number}
              direction="up"
              delay={index * 150}
            >
              <article>
                {step.number === "01" ? (
                  <ShareSkinStepImage alt={step.alt} />
                ) : (
                  <div className="relative aspect-[433/415] w-full overflow-hidden rounded-[25px]">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover"
                    />
                  </div>
                )}

                <p className="mt-5 font-serif text-4xl leading-none text-brand-light sm:mt-7 sm:text-6xl lg:text-7xl">
                  {step.number}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-brand-primary sm:text-[1.75rem] lg:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base font-light leading-relaxed text-brand-gray sm:text-lg">
                  {step.description}
                </p>
              </article>
            </AnimatedSlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
