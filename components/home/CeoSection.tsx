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
          className="relative flex min-h-[18rem] flex-col items-end justify-end bg-brand-cream pl-4 sm:min-h-[28rem] sm:pl-6 lg:min-h-[42rem] lg:pl-10 xl:pl-12"
        >
          <Image
            src="/svgs/ceo.svg"
            alt="Ayma Arif, aesthetics expert and co-founder of Glam Repairs"
            width={518}
            height={672}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full max-w-md translate-y-4 object-contain object-bottom sm:max-w-lg sm:translate-y-0 lg:h-full lg:max-w-none lg:w-full lg:object-cover lg:object-bottom"
            priority={false}
          />
          <p className="relative z-10 hidden w-full px-4 pb-6 text-center text-sm font-light italic leading-snug tracking-tight text-brand-gray sm:block sm:px-6 sm:pb-8 sm:text-base lg:px-8 lg:pb-10 lg:text-left lg:text-lg">
            &ldquo;Healthy skin starts with the right information &mdash; not the
            most expensive products.&rdquo;
          </p>
        </AnimatedSlideIn>

        <div className="flex items-start overflow-visible bg-gradient-to-r from-brand-cream via-white to-brand-light/20 px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-40 xl:px-16 xl:pt-44">
          <AnimatedSlideIn direction="right" className="w-full sm:-ml-6 lg:-ml-10">
            <header>
              <p className="text-xs font-normal uppercase tracking-[0.15em] text-brand-gray sm:text-sm">
                Meet your expert
              </p>
              <h2 className="mt-3 font-serif text-[1.75rem] tracking-normal text-brand-primary sm:mt-4 sm:text-[2.7rem] lg:text-[3.3rem]">
                Ayma Arif Aesthetics Expert &amp; Co-Founder
              </h2>
            </header>

            <p className="mt-4 inline-block rounded-full bg-brand-cream px-4 py-2 text-xs font-light leading-snug tracking-tight text-brand-gray sm:mt-5 sm:px-5 sm:py-2.5 sm:text-sm">
              BSc Cosmetology &amp; Dermatology Science &middot; KFU &middot;
              Clinic-trained
            </p>

            <p className="mt-4 max-w-xl text-sm font-light leading-snug tracking-tighter text-black sm:mt-6 sm:max-w-2xl sm:text-base lg:max-w-4xl">
              Ayma Arif is a certified aesthetics professional with a
              Bachelor&apos;s degree in Cosmetology and Dermatology Science.
              With hands-on experience across multiple clinics in Pakistan, she
              has helped clients with skin assessments, treatment planning, and
              evidence-based skincare routines for a wide range of concerns.
            </p>

            <p className="mt-3 max-w-xl text-sm font-light leading-snug tracking-tighter text-black sm:max-w-2xl sm:text-base lg:max-w-4xl">
              She co-founded Glam Repairs because she saw firsthand how many
              people were struggling with their skin, not from a lack of care,
              but from a lack of access to clear, personalized guidance. Glam
              Repairs is her answer to that gap.
            </p>

            <SkinAssessmentCta
              size="md"
              className="mx-auto mt-6 block w-full max-w-xs sm:mt-10 sm:w-fit lg:mx-0 lg:max-w-none"
            />
          </AnimatedSlideIn>
        </div>
      </div>
    </section>
  );
}
