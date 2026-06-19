import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/home/Logo";
import SkinAssessmentCta from "@/components/home/SkinAssessmentCta";
const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Pricing", href: "#" },
];

const resourceLinks = [
  { label: "Licensing", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path d="M10.5 3h3.2V0h-3.2C7.6 0 5.5 2.1 5.5 4.8v2.7H2.5V10h3v10h5V10h3.4l.6-3.5H10.5V4.8c0-1 .8-1.8 1.8-1.8Z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="14.75" cy="5.25" r="0.9" fill="currentColor" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <path d="M14.2 5.4c1.1.8 2.4 1.2 3.8 1.1V8.6c-1.3 0-2.5-.4-3.5-1.1v5.9c0 3.1-2.5 5.6-5.6 5.6S3.3 17.5 3.3 14.4s2.5-5.6 5.6-5.6c.3 0 .6 0 .9.1v3.1c-.3-.1-.6-.1-.9-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V3.3h3c.1 1.2.7 2.3 1.6 2.1Z" />
    ),
  },
  {
    label: "Google",
    href: "#",
    icon: (
      <path d="M16.2 10.2c0-.6-.1-1.2-.2-1.7H10v3.2h3.5c-.2 1-.7 1.8-1.5 2.4v2h2.4c1.4-1.3 2.2-3.2 2.2-5.5v-.4Z" />
    ),
  },
];

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

function AppStoreBadge() {
  return (
    <a
      href="#"
      aria-label="Download on the App Store"
      className="mt-4 inline-block transition-opacity hover:opacity-90 sm:mt-5"
    >
      <Image
        src="/svgs/appStore.svg"
        alt=""
        width={83}
        height={26}
        className="h-auto w-[110px] sm:w-[125px]"
      />
    </a>
  );
}

function FooterCtaSection() {
  return (
    <section className="bg-[#FFF9E5]">
      <div className="grid lg:grid-cols-[minmax(0,65%)_minmax(0,35%)]">
        <div className="flex w-full flex-col justify-center py-6 pl-6 pr-6 sm:py-8 sm:pl-10 sm:pr-8 lg:py-10 lg:pl-16 lg:pr-10 xl:pl-20 xl:pr-12">
          <h2 className="max-w-none font-serif text-[5rem] leading-none tracking-[-0.03em] text-brand-primary sm:text-[6rem] lg:text-[6.5rem]">
            <span className="block">Ready for</span>
            <span className="block whitespace-nowrap">Healthier Skin?</span>
          </h2>
          <p className="mt-2 max-w-4xl text-[2rem] font-light leading-tight tracking-tight text-black [word-spacing:-0.12em] sm:mt-3 sm:text-[2.25rem] lg:max-w-5xl lg:text-[2.5rem]">
            Let our skincare specialists create a treatment plan tailored to
            your needs.
          </p>
          <SkinAssessmentCta className="mt-5 w-fit sm:mt-6" />
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

      <div className="bg-[#5D348B] text-white">
        <div className="w-full px-4 pt-20 pb-8 sm:px-5 sm:pt-24 sm:pb-9 lg:px-6 lg:pt-28 lg:pb-10">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5 lg:gap-5 xl:gap-6">
            <div className="-mt-5 sm:col-span-2 sm:-mt-7 lg:col-span-1 lg:-mt-10">
              <Logo className="-ml-5 h-20 sm:-ml-7 sm:h-24 lg:-ml-9 lg:h-28" />
              <p className="mt-5 max-w-[16rem] text-base font-light leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
                Download the app by clicking the link below :
              </p>
              <AppStoreBadge />
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
                      <path d="M6.5 3h7A2.5 2.5 0 0 1 16 5.5v9A2.5 2.5 0 0 1 13.5 17h-7A2.5 2.5 0 0 1 4 14.5v-9A2.5 2.5 0 0 1 6.5 3Zm0 1.5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1h-7Zm3.5 8.8a.75.75 0 0 0 .8 0l2.5-1.5a.75.75 0 0 0-.8-1.3l-2.1 1.3-2.1-1.3a.75.75 0 1 0-.8 1.3l2.5 1.5Z" />
                    </svg>
                  }
                >
                  (406) 555-0120
                </ContactRow>
                <ContactRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9A2.5 2.5 0 0 1 14.5 17h-9A2.5 2.5 0 0 1 3 14.5v-9ZM5.5 5c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5h-9Zm1.2 2.2 3.3 2.5 3.3-2.5v.8l-3.3 2.5-3.3-2.5v-.8Z" />
                    </svg>
                  }
                >
                  hello@glamrepairs.com
                </ContactRow>
                <ContactRow
                  icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M10 2a5.5 5.5 0 0 0-5.5 5.5c0 4.1 5.5 10.5 5.5 10.5S15.5 11.6 15.5 7.5A5.5 5.5 0 0 0 10 2Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                    </svg>
                  }
                >
                  2972 Westheimer Rd. Santa Ana, Illinois 85486
                </ContactRow>
              </ul>
            </div>

            <div>
              <FooterHeading>Social media</FooterHeading>
              <div className="mt-5 flex flex-wrap gap-3.5 sm:mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/70 text-white transition-colors hover:border-white hover:bg-white/10 sm:h-12 sm:w-12"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="-mx-4 border-t border-white/30 sm:-mx-5 lg:-mx-6" />
            <p className="mt-3 text-center text-base font-light text-white/90 sm:mt-3.5 sm:text-lg">
              Copyright Glam repair
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
