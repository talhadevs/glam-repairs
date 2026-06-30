import Image from "next/image";
import Link from "next/link";

import ContactForm from "@/components/contact/ContactForm";
import { contactReachOut } from "@/components/contact/contactContent";

export default function ContactSection() {
  return (
    <section className="bg-white px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14 xl:px-12">
      <div className="mx-auto max-w-[86rem]">
        <div className="rounded-[10px] bg-[#fefaf2] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-start lg:gap-12 xl:gap-16">
            <div className="max-w-xl">
              <h2 className="font-serif text-[2rem] tracking-normal text-brand-primary sm:text-[2.375rem] lg:text-[2.625rem]">
                {contactReachOut.title}
              </h2>
              <p className="mt-3 max-w-md text-base font-light leading-relaxed text-brand-ink sm:mt-4 sm:text-lg">
                {contactReachOut.description}
              </p>

              <div className="mt-8 flex items-center gap-4 sm:mt-10">
                <Image
                  src={contactReachOut.whatsappIcon}
                  alt=""
                  width={41}
                  height={41}
                  className="h-10 w-10 shrink-0 object-contain"
                />
                <Link
                  href={contactReachOut.phoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-[1.75rem] italic tracking-[0.1em] text-brand-ink transition-opacity hover:opacity-80 sm:text-[2rem]"
                >
                  {contactReachOut.phoneDisplay}
                </Link>
              </div>

              <div className="mt-8 inline-flex rounded-[10px] bg-white p-3 sm:mt-10">
                <Image
                  src={contactReachOut.qrCode}
                  alt="WhatsApp QR code"
                  width={135}
                  height={135}
                  className="h-[7.5rem] w-[7.5rem] object-contain sm:h-[8.4375rem] sm:w-[8.4375rem]"
                />
              </div>
            </div>

            <div className="rounded-[10px] bg-[#fefaf2] px-5 py-8 sm:px-8 sm:py-9 lg:px-9 lg:py-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
