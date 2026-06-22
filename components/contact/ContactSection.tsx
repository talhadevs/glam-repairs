import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";

const contactImage = "/svgs/woman-using-face-roller-skincare 1.svg";

export default function ContactSection() {
  return (
    <section className="bg-white px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14 xl:px-12">
      <div className="mx-auto max-w-[86rem]">
        <div className="overflow-hidden rounded-[24px] bg-[color-mix(in_srgb,var(--brand-cream)_50%,white)]">
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
                priority={false}
              />
            </div>
          </div>
        </div>

        <ContactInfoCards />
      </div>
    </section>
  );
}
