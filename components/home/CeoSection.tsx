"use client";

import Image from "next/image";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";

export default function CeoSection() {
  return (
    <section className="overflow-hidden bg-[#fdf6e4]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8 lg:px-12">
        <AnimatedSlideIn
          direction="left"
          className="order-2 w-full lg:order-1"
        >
          <Image
            src="/images,svgs/ceo_doctor.png"
            alt="Dr. Ayma Arif, aesthetics and dermatology expert holding a tablet"
            width={660}
            height={694}
            sizes="(max-width: 1024px) 95vw, 55vw"
            className="mx-auto block h-auto w-full max-w-[34rem] object-contain object-bottom sm:max-w-[42rem] lg:mx-0 lg:max-w-none"
            priority={false}
          />
        </AnimatedSlideIn>

        <AnimatedSlideIn
          direction="right"
          className="order-1 min-w-0 pt-12 sm:pt-16 md:mx-auto md:max-w-[34rem] lg:order-2 lg:mx-0 lg:max-w-none lg:py-16 lg:pt-16"
        >
          <header>
            <span className="relative inline-block">
              <Image
                src="/svgs/meet-expert-ellipse.svg"
                alt=""
                width={294}
                height={58}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[165%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2"
              />
              <span className="relative font-sans text-brand-ink text-2xl sm:text-[1.75rem] lg:text-[2rem]">
                Meet Your Expert
              </span>
            </span>

            <h2 className="mt-5 font-serif italic leading-none text-brand-primary text-[2.5rem] sm:mt-6 sm:text-6xl lg:text-[4.5rem]">
              Dr. Ayma Arif
            </h2>
          </header>

          <p className="mt-4 font-sans italic tracking-[-0.03em] text-brand-ink text-lg sm:text-xl lg:text-[1.375rem]">
            Aesthetics &amp; Dermatology Expert
          </p>
          <p className="mt-1 font-sans italic text-[rgba(31,31,31,0.55)] text-sm sm:text-[15px] lg:text-base">
            (BSc Cosmetology &amp; Dermatology Science &middot; KFU &middot;
            Clinic-trained)
          </p>

          <p className="mt-6 max-w-xl text-justify font-sans leading-relaxed text-brand-ink text-base sm:text-lg md:max-w-none lg:max-w-2xl lg:text-xl">
            <span className="font-serif italic">Dr. Ayma Arif</span>{" "}is a
            certified aesthetics professional with a Bachelor&apos;s degree in
            Cosmetology and Dermatology Science. With hands-on experience across
            multiple clinics in Pakistan, she has helped clients with skin
            assessments, treatment planning, and evidence-based skincare
            routines for a wide range of concerns.
          </p>
          <p className="mt-5 max-w-xl text-justify font-sans leading-relaxed text-brand-ink text-base sm:text-lg md:max-w-none lg:max-w-2xl lg:text-xl">
            She co-founded Glam Repairs because she saw firsthand how many people
            were struggling with their skin, not from a lack of care, but from a
            lack of access to clear, personalized guidance. Glam Repairs is her
            answer to that gap.
          </p>
        </AnimatedSlideIn>
      </div>
    </section>
  );
}
