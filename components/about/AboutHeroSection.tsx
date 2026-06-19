import { aboutHero } from "@/components/about/aboutContent";

export default function AboutHeroSection() {
  return (
    <section className="bg-white px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-10 lg:pb-14 lg:pt-14 xl:px-12">
      <div className="mx-auto max-w-[86rem]">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-[2.75rem] tracking-normal text-brand-primary sm:text-5xl lg:text-[4.25rem]">
            {aboutHero.headline}
          </h1>
          <div className="mt-4 space-y-4 sm:mt-5">
            {aboutHero.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base font-light leading-snug text-brand-gray sm:text-lg lg:text-xl lg:leading-[1.45]"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm font-light text-brand-primary sm:mt-6 sm:text-base">
            {aboutHero.trustTags.map((tag, index) => (
              <span key={tag} className="inline-flex items-center">
                {index > 0 ? (
                  <span aria-hidden className="mr-2 text-brand-gray/60">
                    ·
                  </span>
                ) : null}
                <span>
                  <span aria-hidden className="mr-1.5">
                    ✓
                  </span>
                  {tag}
                </span>
              </span>
            ))}
          </p>
        </header>
      </div>
    </section>
  );
}
