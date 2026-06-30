"use client";

import Image from "next/image";
import Link from "next/link";
import { BOOKING_START_HREF } from "@/components/booking/bookingConfig";
import Navbar from "@/components/home/Navbar";

const heroBackground = "/images,svgs/hero_skin.webp";

export default function Hero() {
  return (
    <section className="relative min-h-[60svh] overflow-hidden bg-white lg:min-h-[100svh]">
      <Image
        src={heroBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[#1b1b1b]/30" />

      <Navbar />

      <div className="relative z-10 flex min-h-[60svh] flex-col items-center justify-center px-5 pb-12 pt-[92px] text-center sm:px-6 lg:min-h-[100svh] lg:pb-16 lg:pt-[72px]">
        <h1 className="font-serif text-[40px] italic leading-[1.05] tracking-[-0.32px] text-white sm:text-[56px] lg:text-[72px]">
          <span className="block">Everyone Deserves</span>
          <span className="block">
            <span className="font-inter font-medium not-italic">Healthy</span>{" "}
            Skin
          </span>
        </h1>

        <p className="mt-6 max-w-[659px] font-inter text-base font-normal leading-[1.35] text-white sm:text-lg lg:mt-[54px] lg:text-[24px]">
          Share your concerns &amp; receive a personalized skincare routine from
          a certified{" "}
          <span className="font-serif italic">Aesthetics Expert</span>, with
          complete privacy, delivered to you within{" "}
          <span className="font-serif italic">48&nbsp;hours</span>.
        </p>

        <Link
          href={BOOKING_START_HREF}
          className="mt-8 inline-flex items-center justify-center rounded-[30px] bg-white/10 px-[35px] py-[15px] font-inter text-sm font-medium uppercase leading-none tracking-[-0.54px] text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:mt-9 lg:text-[18px]"
        >
          Get My Skin Assessment
        </Link>
      </div>
    </section>
  );
}
