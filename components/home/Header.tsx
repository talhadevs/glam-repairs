"use client";

import { useState } from "react";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import Logo from "@/components/home/Logo";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "HOME", href: "/", active: true },
  { label: "ABOUT", href: "#" },
  { label: "PRICING", href: "#" },
];

type NavLinksProps = {
  className?: string;
  onLinkClick?: () => void;
};

function NavLinks({ className, onLinkClick }: NavLinksProps) {
  return (
    <nav className={className}>
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onLinkClick}
          className={`text-sm font-normal tracking-wide text-white sm:text-lg ${
            link.active
              ? "rounded-full bg-white/20 px-3 py-1.5 sm:px-5 sm:py-2.5"
              : ""
          }`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
          open ? "top-[7px] rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] block h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
          open ? "top-[7px] -rotate-45" : "top-[14px]"
        }`}
      />
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="absolute inset-x-0 top-0 z-10 px-4 py-3 sm:px-6 sm:py-5 lg:px-12">
      <div className="mx-auto max-w-7xl lg:hidden">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex justify-start">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              <BurgerIcon open={menuOpen} />
            </button>
          </div>

          <AnimatedSlideIn direction="down" className="justify-self-center">
            <Logo className="h-14 sm:h-16" />
          </AnimatedSlideIn>

          <div className="flex justify-end">
            <Button variant="accent" className="shrink-0 whitespace-nowrap">
              BOOK NOW
            </Button>
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-4 w-1/2 rounded-2xl bg-white/10 px-5 py-5 backdrop-blur-md">
              <NavLinks
                className="flex flex-col items-center gap-5"
                onLinkClick={closeMenu}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 lg:grid">
        <AnimatedSlideIn
          direction="down"
          className="col-start-2 justify-self-center"
        >
          <Logo className="h-14 xl:h-[4.5rem]" />
        </AnimatedSlideIn>

        <div className="col-start-3 flex justify-end">
          <AnimatedSlideIn direction="right">
            <Button variant="accent">BOOK NOW</Button>
          </AnimatedSlideIn>
        </div>

        <AnimatedSlideIn
          direction="left"
          className="col-start-1 row-start-1 self-start"
        >
          <NavLinks className="flex items-center justify-start gap-10" />
        </AnimatedSlideIn>
      </div>
    </header>
  );
}
