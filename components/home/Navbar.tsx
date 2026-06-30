"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo, {
  NAVBAR_LOGO_CLASS,
  NAVBAR_LOGO_COLOR_CLASS,
} from "@/components/home/Logo";

export const onboardingHref = "/onboarding";

const navPillBase =
  "inline-flex h-[39px] items-center justify-center whitespace-nowrap rounded-[50px] px-[25px] font-inter text-[16px] uppercase leading-none transition-colors";

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

type NavbarProps = {
  className?: string;
  theme?: "dark" | "light";
};

export default function Navbar({ className = "", theme = "dark" }: NavbarProps) {
  const isLight = theme === "light";
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkPillClass = (active: boolean) => {
    if (isLight) {
      return `${navPillBase} ${
        active
          ? "bg-[#ead7ff] text-brand-primary"
          : "bg-transparent text-brand-primary/80 hover:text-brand-primary"
      }`;
    }

    return `${navPillBase} text-white ${
      active
        ? "bg-white/5"
        : "bg-transparent opacity-80 hover:opacity-100"
    }`;
  };

  const getStartedClass = isLight
    ? `${navPillBase} ml-auto bg-[#ead7ff] text-brand-primary hover:bg-[#e0c8f5]`
    : `${navPillBase} ml-auto bg-[rgba(234,215,255,0.5)] text-white hover:bg-[rgba(234,215,255,0.7)]`;

  const logoVariant = isLight ? "color" : "white";
  const logoClass = isLight ? NAVBAR_LOGO_COLOR_CLASS : NAVBAR_LOGO_CLASS;

  return (
    <nav
      className={`absolute inset-x-0 top-0 z-30 h-[4.5rem] md:h-20 xl:h-24 ${className}`.trim()}
    >
      <div className="relative mx-auto hidden h-full max-w-[1440px] items-center justify-between px-[50px] lg:flex">
        <div className="flex items-center gap-[15px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={linkPillClass(isLinkActive(link.href))}
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
          <Logo className={logoClass} variant={logoVariant} />
        </Link>

        <Link href={onboardingHref} className={getStartedClass}>
          Get Started
        </Link>
      </div>

      <div className="flex h-full items-center justify-between px-5 sm:px-8 lg:hidden">
        <Link href="/" aria-label="Glam Repairs home">
          <Logo className={logoClass} variant={logoVariant} />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`flex items-center justify-center p-2 ${
            isLight ? "text-brand-primary" : "text-white"
          }`}
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

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          />
          <div className="absolute right-5 top-full z-30 mt-2 flex w-[210px] flex-col gap-2 rounded-2xl border border-white/20 bg-black/40 p-4 backdrop-blur-md sm:right-8 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-full px-4 py-2 text-center font-inter text-[15px] uppercase leading-none text-white transition-colors hover:bg-white/10 ${
                  isLinkActive(link.href) ? "bg-white/10" : ""
                }`}
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
  );
}
