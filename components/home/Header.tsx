"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import Logo from "@/components/home/Logo";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PRICING", href: "/pricing" },
  { label: "CONTACT", href: "/contact" },
];

type HeaderProps = {
  variant?: "overlay" | "solid";
};

type NavLinksProps = {
  className?: string;
  pathname: string;
  onLinkClick?: () => void;
};

function NavLinks({ className, pathname, onLinkClick }: NavLinksProps) {
  return (
    <nav className={className}>
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : link.href !== "#" && pathname.startsWith(link.href);

        return (
          <Link
            key={link.label}
            href={link.href}
            onClick={onLinkClick}
            className={`text-sm font-normal tracking-wide text-white sm:text-lg ${
              isActive
                ? "rounded-full bg-white/20 px-3 py-1.5 sm:px-5 sm:py-2.5"
                : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`burger-toggle ${open ? "is-open" : ""}`}
      aria-hidden
    >
      <span className="burger-bar burger-bar--top" />
      <span className="burger-bar burger-bar--middle" />
      <span className="burger-bar burger-bar--bottom" />
    </span>
  );
}

export default function Header({ variant = "overlay" }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isSolid = variant === "solid";

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`z-50 ${
        isSolid ? "relative" : "absolute inset-x-0 top-0 px-4 sm:px-6 lg:px-12"
      }`}
    >
      <div className={`relative lg:hidden ${isSolid ? "w-full bg-brand-primary" : "mx-auto max-w-7xl"}`}>
        <div
          className={`relative z-50 mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 ${
            isSolid
              ? "min-h-[3.5rem] px-4 sm:min-h-[4rem] sm:px-6"
              : "py-3 sm:py-5"
          }`}
        >
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="flex items-center justify-center p-0 text-white"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              <BurgerIcon open={menuOpen} />
            </button>
          </div>

          <AnimatedSlideIn direction="down" className="flex items-center justify-self-center">
            <Link href="/" aria-label="Glam Repairs home">
              <Logo className="h-14 sm:h-16" />
            </Link>
          </AnimatedSlideIn>

          <div className="flex items-center justify-end">
            <Button variant="accent" className="shrink-0 whitespace-nowrap">
              BOOK NOW
            </Button>
          </div>
        </div>

        {menuOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
            onClick={closeMenu}
          />
        ) : null}

        <div
          className={`absolute left-0 top-full z-50 pt-3 transition-all duration-300 ease-out ${
            menuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div
            className={`w-[min(52vw,13rem)] rounded-2xl border px-5 py-5 shadow-lg sm:w-52 ${
              isSolid
                ? "border-white/15 bg-brand-primary/95 backdrop-blur-md"
                : "border-white/20 bg-brand-primary/90 backdrop-blur-md"
            }`}
          >
            <NavLinks
              pathname={pathname}
              className="flex flex-col items-center gap-5"
              onLinkClick={closeMenu}
            />
          </div>
        </div>
      </div>

      <div
        className={`hidden w-full lg:block ${isSolid ? "bg-brand-primary" : ""}`}
      >
        <div
          className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-12 ${
            isSolid ? "h-[4.5rem]" : ""
          }`}
        >
          <AnimatedSlideIn
            direction="down"
            className="col-start-2 flex items-center justify-self-center self-center"
          >
            <Link href="/" aria-label="Glam Repairs home">
              <Logo className="h-14 xl:h-[4.5rem]" />
            </Link>
          </AnimatedSlideIn>

          <div className="col-start-3 flex items-center justify-end self-center">
            <AnimatedSlideIn direction="right">
              <Button variant="accent">BOOK NOW</Button>
            </AnimatedSlideIn>
          </div>

          <AnimatedSlideIn
            direction="left"
            className="col-start-1 row-start-1 flex items-center self-start pt-3 -ml-2 xl:-ml-4"
          >
            <NavLinks
              pathname={pathname}
              className="flex items-center justify-start gap-6 xl:gap-10"
            />
          </AnimatedSlideIn>
        </div>
      </div>
    </header>
  );
}
