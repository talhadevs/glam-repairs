"use client";

import Image from "next/image";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import SkinAssessmentCta from "@/components/home/SkinAssessmentCta";
import TrustPrivacyCard from "@/components/home/TrustPrivacyCard";

const cardTopOffsets = ["lg:-mt-20", "lg:-mt-12", "lg:-mt-4"] as const;

const privacyCards = [
  {
    title: "Private & Secure Storage",
    description:
      "Your photos are stored in a private internal system with restricted access. Only the person preparing your report can see them.",
    icon: "/icons/guard_icon.svg",
  },
  {
    title: "Never Shared Publicly",
    description:
      "Your photos are stored in a private internal system with restricted access. Only the person preparing your report can see them.",
  },
  {
    title: "Deletion On Request",
    description:
      "After your report is delivered, you can request complete deletion of your photos from our system at any time.",
    icon: "/icons/bin_icon.svg",
  },
];

export default function TrustPrivacySection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 sm:px-6 lg:px-12">
      <div className="relative -mx-4 aspect-[4/3] min-h-[16rem] w-auto sm:-mx-6 sm:aspect-[1440/668] sm:min-h-[26rem] lg:-mx-12 lg:min-h-[32rem]">
        <Image
          src="/images,svgs/privacy_bubbles_bg.png"
          alt=""
          fill
          sizes="100vw"
          className="-scale-x-100 object-cover object-center"
          priority={false}
        />

        <div className="absolute inset-0 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto flex h-full max-w-7xl items-start pt-6 sm:pt-10 lg:pt-12">
            <AnimatedSlideIn
              direction="left"
              className="max-w-full sm:-ml-3 lg:-ml-5"
            >
              <header>
                <h2 className="flex flex-wrap items-baseline gap-x-2 leading-none text-[#fdf6e4] text-[1.875rem] sm:text-[3rem] lg:text-[3.875rem]">
                  <span className="font-sans font-normal tracking-[-0.02em]">
                    Trust
                  </span>
                  <span className="font-serif italic">and Privacy</span>
                </h2>
                <p className="mt-2 hidden font-sans font-medium text-brand-ink sm:mt-4 sm:block sm:text-lg lg:text-[1.25rem]">
                  Your privacy is non-negotiable.
                </p>
                <p className="mt-2 hidden font-sans font-normal leading-normal text-brand-ink sm:mt-3 sm:block sm:text-base lg:text-[1.25rem]">
                  You&apos;re sharing photos of your skin. We take that
                  seriously.
                </p>
              </header>
            </AnimatedSlideIn>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="-mt-16 flex flex-col gap-4 sm:-ml-5 sm:-mt-32 lg:-ml-10 lg:-mt-40 lg:flex-row lg:items-start lg:gap-0">
          {privacyCards.map((card, index) => (
            <AnimatedSlideIn
              key={card.title}
              direction="up"
              delay={index * 150}
              className={`w-full shrink-0 lg:w-auto ${cardTopOffsets[index]}`}
            >
              <TrustPrivacyCard {...card} />
            </AnimatedSlideIn>
          ))}
        </div>
      </div>

      <div className="relative -mx-4 mt-8 bg-white pb-12 pt-16 sm:-mx-6 sm:mt-12 sm:pb-20 sm:pt-28 lg:-mx-12 lg:pb-24 lg:pt-32">
        <AnimatedSlideIn
          direction="up"
          className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-12"
        >
          <h3 className="text-brand-primary text-2xl leading-snug sm:text-4xl lg:text-[3.25rem] lg:leading-[1.25]">
            <span className="font-sans italic tracking-[-0.015em]">
              The consultation you&apos;ve been putting off
            </span>{" "}
            <span className="font-serif italic">- done in 24 hours.</span>
          </h3>
          <SkinAssessmentCta
            label="GET MY SKIN GUIDANCE"
            size="lg"
            className="mt-8 sm:mt-10"
          />
        </AnimatedSlideIn>
      </div>
    </section>
  );
}
