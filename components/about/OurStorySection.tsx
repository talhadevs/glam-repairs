import Image from "next/image";
import AboutFeatureCard from "@/components/about/AboutFeatureCard";
import {
  aboutFeatureCards,
  aboutImage,
  aboutStory,
} from "@/components/about/aboutContent";

export default function OurStorySection() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24 xl:px-12">
      <div className="mx-auto grid max-w-[86rem] gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12 xl:gap-16">
        <div className="relative mx-auto w-full max-w-xl lg:min-h-[38rem] lg:max-w-none xl:min-h-[42rem]">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <AboutFeatureCard
              title={aboutFeatureCards[0].title}
              description={aboutFeatureCards[0].description}
              icon={aboutFeatureCards[0].icon}
              animationDirection={aboutFeatureCards[0].animationDirection}
              animationDelay={aboutFeatureCards[0].animationDelay}
              className={`pointer-events-auto ${aboutFeatureCards[0].className}`}
            />
          </div>

          <div className="relative z-10 mx-auto w-fit lg:ml-0 lg:mt-14 lg:translate-x-4 xl:mt-16 xl:translate-x-8">
            <div className="relative h-[26rem] w-[21rem] rotate-[25deg] overflow-hidden rounded-[50%] sm:h-[30rem] sm:w-[24rem] lg:h-[32rem] lg:w-[27rem] xl:h-[34rem] xl:w-[29rem]">
              <div className="absolute inset-0 flex -rotate-[25deg] scale-[1.25] items-center justify-center">
                <Image
                  src={aboutImage}
                  alt="Skincare professional applying a face mask during treatment"
                  width={463}
                  height={439}
                  className="h-full w-full object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:hidden">
            {aboutFeatureCards.map((card) => (
              <AboutFeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
                animationDirection={card.animationDirection}
                animationDelay={card.animationDelay}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
            {aboutFeatureCards.slice(1).map((card) => (
              <AboutFeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
                animationDirection={card.animationDirection}
                animationDelay={card.animationDelay}
                className={`pointer-events-auto ${card.className}`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-2xl lg:max-w-none">
          <p className="font-serif text-lg text-brand-primary sm:text-xl">
            {aboutStory.label}
          </p>
          <h2 className="mt-3 font-serif text-[2rem] leading-tight tracking-normal text-brand-primary sm:mt-4 sm:text-[2.75rem] lg:text-[3.25rem]">
            {aboutStory.heading}
          </h2>
          <div className="mt-5 space-y-4 sm:mt-6">
            {aboutStory.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-sm font-light leading-relaxed text-brand-gray sm:text-base lg:text-[17px] lg:leading-[1.65]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
