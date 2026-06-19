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
    icon: "/svgs/BG.svg",
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
  },
];

export default function TrustPrivacySection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 sm:px-6 lg:px-12">
      <div className="relative -mx-4 aspect-[4/3] min-h-[16rem] w-auto sm:-mx-6 sm:aspect-[1440/668] sm:min-h-[26rem] lg:-mx-12 lg:min-h-[32rem]">
        <Image
          src="/svgs/image 576.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />

        <div className="absolute inset-0 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto flex h-full max-w-7xl items-start pt-6 sm:pt-10 lg:pt-12">
            <AnimatedSlideIn
              direction="left"
              className="max-w-full sm:-ml-3 lg:-ml-5"
            >
              <header>
                <h2 className="font-serif text-[1.4rem] tracking-normal text-brand-primary sm:text-[3.25rem] lg:text-[3.5rem]">
                  TRUST &amp; PRIVACY
                </h2>
                <p className="mt-1 hidden text-sm font-light tracking-tight text-brand-gray sm:mt-2 sm:block sm:text-2xl lg:text-[1.75rem]">
                  Your privacy is non-negotiable.
                </p>
                <p className="mt-3 hidden text-[11px] font-light leading-snug tracking-tighter text-brand-gray sm:mt-4 sm:block sm:text-lg lg:text-xl">
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
          <h3 className="font-serif text-2xl leading-snug text-brand-primary sm:text-4xl lg:text-[2.75rem] lg:leading-[1.3]">
            The consultation you&apos;ve been putting off - done in 24 hours.
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
