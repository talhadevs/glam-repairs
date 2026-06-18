import Image from "next/image";
import Header from "@/components/home/Header";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh]">
      <Image
        src="/svgs/hero_bg.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <Header />

      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-12 pt-36 text-center text-white sm:px-6 sm:pb-16 sm:pt-40 lg:px-8 lg:pt-32">
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <p className="whitespace-nowrap text-base font-light sm:text-xl lg:text-2xl">
            Real skin experts. No appointment. No waiting room. Just answers.
          </p>

          <div className="mt-1 sm:mt-2">
            <h1 className="max-w-xl font-serif text-5xl leading-none sm:max-w-4xl sm:text-7xl lg:text-[6.5rem]">
              Everyone Deserves
              <br />
              Healthy Skin
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-center text-xl font-light leading-relaxed sm:mt-8 sm:max-w-3xl sm:text-2xl">
              Share your concerns, upload photos, and receive a personalized
              skincare routine from a certified aesthetics expert, with complete
              privacy, delivered to you within 48 hours.
            </p>
          </div>

          <Button
            variant="cta"
            className="mt-8 w-full max-w-sm sm:mt-10 sm:w-auto sm:max-w-none"
          >
            GET MY SKIN ASSESSMENT
          </Button>
        </div>
      </div>
    </section>
  );
}
