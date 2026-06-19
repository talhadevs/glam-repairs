"use client";

import Image from "next/image";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import PillBadge from "@/components/home/PillBadge";
import Button from "@/components/ui/Button";

export default function SkinAssessment() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <div className="relative mx-auto max-w-6xl lg:min-h-[520px]">
        <AnimatedSlideIn
          direction="left"
          className="mb-6 sm:-ml-10 sm:mb-8 lg:absolute lg:-ml-14 lg:top-0 lg:mb-0 lg:left-0"
        >
          <PillBadge icon="/svgs/skin_concern.svg" label="SKIN CONCERNS" />
        </AnimatedSlideIn>

        <div className="mx-auto flex max-w-6xl flex-col items-center text-center lg:max-w-7xl lg:px-8 lg:pt-12">
          <h2 className="mt-4 px-1 font-serif text-[1.65rem] leading-snug sm:mt-8 sm:px-0 sm:text-5xl sm:leading-snug lg:mt-10 lg:text-[3.25rem] lg:leading-[1.35] xl:text-[3.75rem]">
            <span className="text-brand-primary">Receive a personalized</span>{" "}
            <span className="text-brand-light">
              skin assessment,{" "}
              <span className="lg:whitespace-nowrap">
                skincare routine recommendations, aesthetic
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              guidance based on your skin concerns and submitted photos.
            </span>
          </h2>

          <div className="relative mt-8 flex w-full max-w-lg items-center justify-center sm:mt-12 sm:max-w-xl lg:mt-14">
            <Image
              src="/svgs/curve.svg"
              alt=""
              width={526}
              height={91}
              className="absolute w-full max-w-md sm:max-w-lg"
            />
            <p className="relative z-10 px-4 py-3 text-lg font-light tracking-tight text-brand-gray sm:px-10 sm:py-4 sm:text-2xl">
              &ldquo;We don&apos;t scan your skin. We read it.&rdquo;
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col items-stretch gap-5 sm:mt-12 sm:flex-row sm:items-end sm:justify-between lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mt-0">
          <AnimatedSlideIn
            direction="left"
            className="sm:-ml-10 lg:-ml-14"
          >
            <PillBadge icon="/svgs/routine.svg" label="ROUTINE" />
          </AnimatedSlideIn>

          <AnimatedSlideIn
            direction="right"
            className="self-center sm:ml-auto sm:self-auto"
          >
            <Button
              variant="primary"
              icon={
                <Image
                  src="/svgs/analyze.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="h-[18px] w-[18px]"
                />
              }
            >
              ANALYZE
            </Button>
          </AnimatedSlideIn>
        </div>
      </div>
    </section>
  );
}
