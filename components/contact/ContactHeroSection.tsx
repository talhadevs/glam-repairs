import Image from "next/image";
import { preload } from "react-dom";

import {
  contactHero,
  contactHeroBackground,
} from "@/components/contact/contactContent";
import Header from "@/components/home/Header";

preload(contactHeroBackground, { as: "image", fetchPriority: "high" });

export default function ContactHeroSection() {
  return (
    <section className="relative min-h-[55vh] overflow-hidden sm:min-h-[60vh] lg:min-h-[65vh]">
      <Image
        src={contactHeroBackground}
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

      <div className="relative z-[2] flex min-h-[55vh] flex-col items-center justify-center px-4 pb-10 pt-32 text-center text-white sm:min-h-[60vh] sm:px-6 sm:pb-12 sm:pt-36 lg:min-h-[65vh] lg:pt-40">
        <h1 className="mx-auto max-w-4xl font-serif text-[2.75rem] leading-tight tracking-normal sm:text-5xl lg:text-[4.25rem]">
          {contactHero.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed sm:mt-5 sm:text-lg lg:text-xl lg:leading-[1.45]">
          {contactHero.subtitle}
        </p>
      </div>
    </section>
  );
}
