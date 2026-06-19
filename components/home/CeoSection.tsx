"use client";

import Image from "next/image";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import SkinAssessmentCta from "@/components/home/SkinAssessmentCta";
export default function CeoSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2">
        <AnimatedSlideIn
          direction="left"
          className="relative flex min-h-[24rem] items-end justify-center bg-brand-cream pl-4 sm:min-h-[28rem] sm:pl-6 lg:min-h-[42rem] lg:justify-start lg:pl-10 xl:pl-12"
        >
          <Image
            src="/svgs/ceo.svg"
            alt="Dr. Amelia Hart, co-founder and chief cosmetologist"
            width={518}
            height={672}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full max-w-md object-contain object-bottom sm:max-w-lg lg:h-full lg:max-w-none lg:w-full lg:object-cover lg:object-bottom"
            priority={false}
          />
        </AnimatedSlideIn>

        <div className="flex items-start overflow-visible bg-gradient-to-r from-brand-cream via-white to-brand-light/20 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-40 xl:px-16 xl:pt-44">
          <AnimatedSlideIn direction="right" className="-ml-4 sm:-ml-6 lg:-ml-10">
            <header>
              <h2 className="-ml-30 -mt-3 font-serif text-[3rem] tracking-normal text-brand-primary sm:-mt-4 sm:text-[3.9rem] lg:-mt-5 lg:text-[4.2rem]">
                MEET OUR CEO
              </h2>
              <p className="mt-8 text-[1.2rem] font-light text-brand-gray sm:mt-10 sm:text-[1.35rem]">
                Co-founder &amp; chief cosmetologist
              </p>
            </header>

            <h3 className="-mt-1 font-serif text-[2.25rem] tracking-normal text-brand-primary sm:-mt-0.5 sm:text-[2.7rem] lg:text-[3.3rem]">
              DR. AMELIA HART
            </h3>

            <p className="mt-5 max-w-xl text-left text-[1.5rem] font-light leading-relaxed text-black sm:mt-6 sm:max-w-2xl sm:text-[1.65rem] lg:max-w-4xl xl:max-w-5xl">
              Dr. Amelia Hart is a certified cosmetologist and skincare expert,
              dedicated to helping you achieve healthy, glowing skin through
              science-backed, personalized solutions. Her expertise and passion
              drive innovation behind Glam Repair.
            </p>

            <SkinAssessmentCta
              size="md"
              className="mt-8 w-fit sm:mt-10"
            />
          </AnimatedSlideIn>
        </div>
      </div>
    </section>
  );
}
