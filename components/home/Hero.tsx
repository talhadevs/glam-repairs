import Header from "@/components/home/Header";
import SkinAssessmentCta from "@/components/home/SkinAssessmentCta";

const heroBackground = "/images,svgs/hero_bg.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${heroBackground}")` }}
    >
      <Header />

      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-12 pt-44 text-center text-white sm:px-6 sm:pb-16 sm:pt-40 lg:px-8 lg:pt-32">
        <div className="mt-8 w-full max-w-full sm:mt-16 lg:mt-20">
          <p className="mx-auto max-w-xs text-sm font-light leading-snug sm:max-w-none sm:text-xl lg:whitespace-nowrap lg:text-2xl">
            Real skin experts. No appointment. No waiting room. Just answers.
          </p>

          <div className="mt-2 sm:mt-2">
            <h1 className="mx-auto max-w-sm font-serif text-[3rem] leading-[0.95] sm:max-w-4xl sm:text-7xl lg:text-[6.5rem] lg:leading-none">
              Everyone Deserves
              <br />
              Healthy Skin
            </h1>

            <p className="mx-auto mt-4 max-w-xs text-base font-light leading-relaxed sm:mt-8 sm:max-w-3xl sm:text-2xl">
              Share your concerns, upload photos, and receive a personalized
              skincare routine from a certified aesthetics expert, with complete
              privacy, delivered to you within 48 hours.
            </p>
          </div>

          <SkinAssessmentCta variant="hero" />
        </div>
      </div>
    </section>
  );
}
