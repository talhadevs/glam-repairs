import Image from "next/image";
import { preload } from "react-dom";

import {
  contactHero,
  contactHeroBackground,
} from "@/components/contact/contactContent";
import Navbar from "@/components/home/Navbar";

preload(contactHeroBackground, { as: "image", fetchPriority: "high" });

export default function ContactHeroSection() {
  return (
    <section className="relative isolate flex min-h-[34rem] flex-col overflow-hidden sm:min-h-[42rem] md:min-h-[48rem] lg:min-h-[59.6875rem]">
      <Image
        src={contactHeroBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_28%]"
      />

      <div className="absolute inset-0 bg-[#1b1b1b]/40" aria-hidden />

      <Navbar />

      <div className="relative z-[2] flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-28 text-center text-white sm:px-8 sm:pb-20 sm:pt-32 lg:pt-36">
        <h1 className="mx-auto max-w-4xl font-serif text-[2.75rem] italic leading-[1.05] tracking-[-0.02em] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[4.5rem]">
          {contactHero.headline}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl leading-snug sm:mt-4">
          <span className="block text-lg font-medium sm:text-xl lg:text-2xl">
            {contactHero.subtitleLead}
          </span>
          <span className="block font-serif text-lg italic sm:text-xl lg:text-2xl">
            {contactHero.subtitleAccent}
          </span>
        </p>
      </div>
    </section>
  );
}
