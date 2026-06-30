import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import { aboutStory } from "@/components/about/aboutContent";

export default function OurStorySection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <AnimatedSlideIn direction="up">
          <h2 className="text-brand-primary">
            <span className="font-sans text-[2rem] tracking-[-0.48px] sm:text-[2.75rem] lg:text-[3.5rem]">
              {aboutStory.headingLead}
            </span>{" "}
            <span className="font-serif italic text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]">
              {aboutStory.headingEmphasis}
            </span>
          </h2>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="up" delay={120}>
          <p className="mx-auto mt-4 max-w-2xl tracking-[-0.03em] sm:mt-6">
            <span className="font-sans text-[1.5rem] text-brand-ink sm:text-[2rem] lg:text-[2.5rem]">
              {aboutStory.subheadingLead}{" "}
            </span>
            <span className="font-serif italic text-[1.5rem] text-brand-primary sm:text-[2rem] lg:text-[2.5rem]">
              {aboutStory.subheadingEmphasis}
            </span>
          </p>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="up" delay={240}>
          <div className="mx-auto mt-8 max-w-3xl space-y-5 sm:mt-10">
            <p className="font-sans text-base leading-relaxed text-brand-ink sm:text-lg lg:text-xl lg:leading-[1.6]">
              <span className="font-serif italic">{aboutStory.expertName}</span>{" "}
              {aboutStory.paragraphs[0]}
            </p>
            <p className="font-sans text-base leading-relaxed text-brand-ink sm:text-lg lg:text-xl lg:leading-[1.6]">
              {aboutStory.paragraphs[1]}
            </p>
          </div>
        </AnimatedSlideIn>
      </div>
    </section>
  );
}
