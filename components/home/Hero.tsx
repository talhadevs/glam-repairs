"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/home/Logo";

const heroBackground = "/images,svgs/hero_skin.webp";
const onboardingHref = "/onboarding";

const navPillBase =
  "inline-flex h-[39px] items-center justify-center whitespace-nowrap rounded-[50px] px-[25px] font-inter text-[16px] uppercase leading-none text-white transition-colors";

const navLinks = [
  { label: "Home", href: "/", muted: false },
  { label: "About", href: "/about", muted: true },
  { label: "Pricing", href: "/pricing", muted: true },
];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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

      <nav className="absolute inset-x-0 top-0 z-30 h-[72px]">
        {/* Desktop nav */}
        <div className="relative mx-auto hidden h-full max-w-[1440px] items-center justify-between px-[50px] lg:flex">
          <div className="flex items-center gap-[15px]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${navPillBase} bg-white/5 hover:bg-white/15 ${
                  link.muted ? "opacity-40" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            aria-label="Glam Repairs home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Logo className="h-[42px]" />
          </Link>

          <Link
            href={onboardingHref}
            className={`${navPillBase} ml-auto bg-[rgba(234,215,255,0.5)] hover:bg-[rgba(234,215,255,0.7)]`}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile nav: logo left, burger right */}
        <div className="flex h-full items-center justify-between px-5 sm:px-8 lg:hidden">
          <Link href="/" aria-label="Glam Repairs home">
            <Logo className="h-9 sm:h-10" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex items-center justify-center p-2 text-white"
          >
            <span
              className={`burger-toggle ${menuOpen ? "is-open" : ""}`}
              aria-hidden
            >
              <span className="burger-bar burger-bar--top" />
              <span className="burger-bar burger-bar--middle" />
              <span className="burger-bar burger-bar--bottom" />
            </span>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="fixed inset-0 z-20 bg-black/20 lg:hidden"
            />
            <div className="absolute right-5 top-[68px] z-30 flex w-[210px] flex-col gap-2 rounded-2xl border border-white/20 bg-black/40 p-4 backdrop-blur-md sm:right-8 lg:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-full px-4 py-2 text-center font-inter text-[15px] uppercase leading-none text-white transition-colors hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={onboardingHref}
                onClick={closeMenu}
                className="rounded-full bg-[rgba(234,215,255,0.5)] px-4 py-2 text-center font-inter text-[15px] uppercase leading-none text-white transition-colors hover:bg-[rgba(234,215,255,0.7)]"
              >
                Get Started
              </Link>
            </div>
          </>
        ) : null}
      </nav>

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
          href={onboardingHref}
          className="mt-8 inline-flex items-center justify-center rounded-[30px] bg-white/10 px-[35px] py-[15px] font-inter text-sm font-medium uppercase leading-none tracking-[-0.54px] text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:mt-9 lg:text-[18px]"
        >
          Get My Skin Assessment
        </Link>
      </div>
    </section>
  );
}
