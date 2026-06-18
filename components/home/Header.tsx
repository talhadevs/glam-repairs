"use client";

import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import Logo from "@/components/home/Logo";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "HOME", href: "/", active: true },
  { label: "ABOUT", href: "#" },
  { label: "PRICING", href: "#" },
];

function NavLinks({ className }: { className?: string }) {
  return (
    <nav className={className}>
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`text-base font-normal tracking-wide text-white sm:text-lg ${
            link.active
              ? "rounded-full bg-white/20 px-4 py-2 sm:px-5 sm:py-2.5"
              : ""
          }`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto] items-center gap-4 lg:grid-rows-1">
        <AnimatedSlideIn
          direction="down"
          className="col-start-1 row-start-1 lg:col-start-2 lg:justify-self-center"
        >
          <Logo className="h-11 sm:h-12 lg:h-14 xl:h-[4.5rem]" />
        </AnimatedSlideIn>

        <div className="col-start-3 row-start-1 flex justify-end">
          <AnimatedSlideIn direction="right">
            <Button variant="accent">BOOK NOW</Button>
          </AnimatedSlideIn>
        </div>

        <AnimatedSlideIn
          direction="left"
          className="col-span-3 row-start-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:self-start"
        >
          <NavLinks className="flex items-center justify-center gap-8 sm:gap-10 lg:justify-start lg:gap-10" />
        </AnimatedSlideIn>
      </div>
    </header>
  );
}
