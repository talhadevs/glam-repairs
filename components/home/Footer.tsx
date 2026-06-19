import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/home/Logo";
import SkinAssessmentCta from "@/components/home/SkinAssessmentCta";
const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

const resourceLinks = [
  { label: "How It Works", href: "/" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.012 4.388 11.004 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const trustBadges = [
  "Expert-reviewed by a certified aesthetics professional",
  "100% private — your photos are never shared",
  "Ingredient-first guidance — no brand bias, ever",
  "Biweekly follow-up support on paid plans",
];

const contactEmail = "hello@glamrepairs.com";
const contactPhone = "+92 300 0000000";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="-mt-4 font-serif text-4xl tracking-normal text-brand-cream [text-shadow:0_2px_10px_rgba(0,0,0,0.22),0_1px_3px_rgba(0,0,0,0.14)] sm:-mt-6 sm:text-[2.625rem] lg:-mt-8">
      {children}
    </h3>
  );
}

function FooterLinkList({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-base font-light text-white/90 transition-colors hover:text-white sm:text-lg"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-white" aria-hidden>
        {icon}
      </span>
      <span className="text-base font-light leading-relaxed text-white/90 sm:text-lg">
        {children}
      </span>
    </li>
  );
}

function FooterTrustBadges() {
  return (
    <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3 lg:mt-12">
      {trustBadges.map((badge) => (
        <li
          key={badge}
          className="flex items-start gap-2.5 text-sm font-light leading-snug text-white/90 sm:text-base"
        >
          <span aria-hidden className="mt-0.5 shrink-0 text-brand-cream">
            ✓
          </span>
          <span>{badge}</span>
        </li>
      ))}
    </ul>
  );
}

function FooterSocialLinks() {
  return (
    <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
      {socialLinks.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            aria-label={social.label}
            className="inline-flex items-center gap-2.5 text-base font-light text-white/90 transition-colors hover:text-white sm:text-lg"
          >
            <span className="shrink-0">{social.icon}</span>
            <span>{social.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterCtaSection() {
  return (
    <section className="bg-[color-mix(in_srgb,var(--brand-cream-light)_50%,white)]">
      <div className="grid lg:grid-cols-[minmax(0,65%)_minmax(0,35%)]">
        <div className="flex w-full flex-col justify-center py-6 pl-4 pr-4 sm:py-8 sm:pl-10 sm:pr-8 lg:py-10 lg:pl-16 lg:pr-10 xl:pl-20 xl:pr-12">
          <h2 className="max-w-none font-serif text-[2.75rem] leading-none tracking-[-0.03em] text-brand-primary sm:text-[6rem] lg:text-[6.5rem]">
            <span className="block">Ready for</span>
            <span className="block lg:whitespace-nowrap">Healthier Skin?</span>
          </h2>
          <p className="mt-2 max-w-4xl text-lg font-light leading-tight tracking-tight text-black [word-spacing:-0.12em] sm:mt-3 sm:text-[2.25rem] lg:max-w-5xl lg:text-[2.5rem]">
            Let our skincare specialists create a treatment plan tailored to
            your needs.
          </p>
          <SkinAssessmentCta className="mx-auto mt-4 block w-full max-w-xs sm:mt-6 sm:w-fit lg:mx-0 lg:max-w-none" />
        </div>

        <div className="relative flex min-h-[12rem] items-end justify-center overflow-hidden sm:min-h-[14rem] lg:min-h-[16rem] lg:justify-end">
          <Image
            src="/svgs/girl.svg"
            alt="Woman thoughtfully considering her skincare"
            width={471}
            height={494}
            sizes="(max-width: 1024px) 85vw, 45vw"
            className="h-auto w-full max-w-[18rem] object-contain object-bottom sm:max-w-[20rem] lg:max-w-[24rem] xl:max-w-[28rem]"
          />
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="w-full">
      <FooterCtaSection />

      <div className="bg-brand-primary-dark text-white">
        <div className="w-full px-4 pt-14 pb-8 sm:px-5 sm:pt-24 sm:pb-9 lg:px-6 lg:pt-28 lg:pb-10">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5 lg:gap-5 xl:gap-6">
            <div className="sm:col-span-2 lg:col-span-1 lg:-mt-10">
              <Logo className="h-16 sm:-ml-7 sm:h-24 lg:-ml-9 lg:h-28" />
              <p className="mt-4 max-w-[18rem] text-sm font-light leading-relaxed text-white/90 sm:mt-6 sm:text-base lg:text-lg">
                Your skin questions, clearly answered. Private · Simple ·
                Personalized
              </p>
            </div>

            <div>
              <FooterHeading>Pages</FooterHeading>
              <FooterLinkList links={pageLinks} />
            </div>

            <div>
              <FooterHeading>Resources</FooterHeading>
              <FooterLinkList links={resourceLinks} />
            </div>

            <div>
              <FooterHeading>Contact</FooterHeading>
              <ul className="mt-5 space-y-4 sm:mt-6 sm:space-y-4">
                <ContactRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9A2.5 2.5 0 0 1 14.5 17h-9A2.5 2.5 0 0 1 3 14.5v-9ZM5.5 5c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5h-9Zm1.2 2.2 3.3 2.5 3.3-2.5v.8l-3.3 2.5-3.3-2.5v-.8Z" />
                    </svg>
                  }
                >
                  <a
                    href={`mailto:${contactEmail}`}
                    className="transition-colors hover:text-white"
                  >
                    {contactEmail}
                  </a>
                </ContactRow>
                <ContactRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M6.5 3h7A2.5 2.5 0 0 1 16 5.5v9A2.5 2.5 0 0 1 13.5 17h-7A2.5 2.5 0 0 1 4 14.5v-9A2.5 2.5 0 0 1 6.5 3Zm0 1.5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1h-7Zm3.5 8.8a.75.75 0 0 0 .8 0l2.5-1.5a.75.75 0 0 0-.8-1.3l-2.1 1.3-2.1-1.3a.75.75 0 1 0-.8 1.3l2.5 1.5Z" />
                    </svg>
                  }
                >
                  <a
                    href={`tel:${contactPhone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {contactPhone}
                  </a>
                </ContactRow>
              </ul>
            </div>

            <div>
              <FooterHeading>Social</FooterHeading>
              <FooterSocialLinks />
            </div>
          </div>

          <FooterTrustBadges />

          <div className="mt-8 sm:mt-10">
            <div className="-mx-4 border-t border-white/30 sm:-mx-5 lg:-mx-6" />
            <p className="mt-3 text-center text-sm font-light text-white/90 sm:mt-3.5 sm:text-base">
              © 2025 Glam Repairs · Lahore, Pakistan · All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
