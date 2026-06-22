import Image from "next/image";
import { preload } from "react-dom";

import {
  aboutHero,
  aboutHeroBackground,
  aboutIntro,
} from "@/components/about/aboutContent";
import Header from "@/components/home/Header";

preload(aboutHeroBackground, { as: "image", fetchPriority: "high" });

export default function AboutHeroSection() {
  return (
    <>
      <section className="relative min-h-[115dvh] overflow-hidden sm:min-h-[120dvh] lg:min-h-[130dvh]">
        <Image
          src={aboutHeroBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/40"
          aria-hidden
        />

        <Header />

        <div className="relative z-[2] flex min-h-[115dvh] flex-col items-center justify-center px-4 pb-14 pt-36 text-center text-white sm:min-h-[120dvh] sm:px-6 sm:pb-16 sm:pt-40 lg:min-h-[130dvh] lg:pt-44">
          <h1 className="mx-auto max-w-4xl font-serif text-[2.75rem] leading-tight tracking-normal sm:text-5xl lg:text-[4.25rem]">
            {aboutHero.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed sm:mt-5 sm:text-lg lg:text-xl lg:leading-[1.45]">
            {aboutHero.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-12">
        <div className="mx-auto max-w-[86rem] text-center">
          <h2 className="font-serif text-[2.75rem] tracking-normal text-brand-primary sm:text-5xl lg:text-[4.25rem]">
            {aboutIntro.title}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base font-light leading-snug text-brand-gray sm:mt-4 sm:text-lg lg:text-xl lg:leading-[1.45]">
            {aboutIntro.subtitle}
          </p>
        </div>
      </section>
    </>
  );
}
