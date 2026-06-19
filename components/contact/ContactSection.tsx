import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";

const contactImage = "/svgs/woman-using-face-roller-skincare 1.svg";

export default function ContactSection() {
  return (
    <section className="bg-white px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14 xl:px-12">
      <div className="mx-auto max-w-[86rem]">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-[2.75rem] tracking-normal text-brand-primary sm:text-5xl lg:text-[4.25rem]">
            Contact us
          </h1>
          <p className="mt-4 text-base font-light leading-snug text-brand-gray sm:mt-5 sm:text-lg lg:text-xl lg:leading-[1.45]">
            Have a question about your skin assessment or need help choosing a
            plan? Send us a message and our team will get back to you.
          </p>
        </header>

        <div className="mt-10 overflow-hidden rounded-[24px] bg-[color-mix(in_srgb,var(--brand-cream)_50%,white)] sm:mt-12 lg:mt-14">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <ContactForm />
            </div>

            <div className="relative min-h-[18rem] lg:min-h-full">
              <Image
                src={contactImage}
                alt="Woman using a face roller during skincare routine"
                width={464}
                height={629}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
