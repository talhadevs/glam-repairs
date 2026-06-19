import Image from "next/image";
import FillButton from "@/components/ui/FillButton";

type PricingFeature = {
  title: string;
  description: string;
};

type PricingCardProps = {
  name: string;
  price: string;
  priceNote?: string;
  cta: string;
  description: string;
  features: PricingFeature[];
  exclusions?: string;
  upgradeNudge?: string;
  badge?: string;
};

const stepperIconPool = [
  { src: "/svgs/Group 2085660722.svg", className: "h-5 w-auto" },
  { src: "/svgs/Vector (8).svg", className: "h-5 w-5" },
  { src: "/svgs/Vector (7).svg", className: "h-3.5 w-auto" },
];

function getFeatureStepperIcon(index: number) {
  if (index % 2 !== 0) return null;

  return stepperIconPool[Math.floor(index / 2) % stepperIconPool.length];
}

export default function PricingCard({
  name,
  price,
  priceNote,
  cta,
  description,
  features,
  exclusions,
  upgradeNudge,
  badge,
}: PricingCardProps) {
  return (
    <article className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-[24px] border border-brand-lavender bg-white lg:row-span-2 lg:grid-rows-subgrid">
      <div className="h-full p-2 sm:p-2.5">
        <div className="relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[20px] px-4 pb-3 pt-3 sm:min-h-[16rem] sm:px-5 sm:pb-4 sm:pt-4 lg:min-h-0">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,_#fff9e5_0%,_rgba(255,249,229,0.45)_42%,_transparent_68%),linear-gradient(to_top,_rgba(214,205,234,0.72)_0%,_rgba(214,205,234,0.38)_38%,_transparent_68%)]"
          />

          <div className="relative z-10 flex h-full flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <h3 className="text-lg font-semibold text-black sm:text-xl">{name}</h3>
              {badge ? (
                <span className="rounded-full bg-brand-primary px-2.5 py-1 text-[11px] font-medium text-white sm:text-xs">
                  {badge}
                </span>
              ) : null}
            </div>

            <p className="mt-2 font-serif text-[2.25rem] leading-none text-brand-light sm:text-[2.5rem]">
              {price}
              {priceNote ? (
                <span className="ml-1.5 font-sans text-base font-normal text-brand-gray sm:text-lg">
                  {priceNote}
                </span>
              ) : null}
            </p>

            <p className="mt-3 text-sm leading-snug tracking-tight text-brand-gray [word-spacing:-0.1em] sm:text-[15px] sm:leading-[1.3]">
              {description}
            </p>

            <div className="mt-auto pt-5 sm:pt-6">
              <FillButton variant="subscribe" className="w-full py-3 text-sm">
                {cta}
              </FillButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full min-h-0 flex-col pb-7 sm:pb-8">
        <div className="px-5 pt-7 sm:px-6 sm:pt-8">
          <h4 className="font-serif text-lg font-bold text-black sm:text-xl">
            What&apos;s included:
          </h4>
        </div>

        <ul className="relative flex flex-1 flex-col justify-evenly py-7 pl-5 pr-8 sm:py-8 sm:pl-6 sm:pr-9 lg:py-9">
        {features.map((feature, index) => {
          const stepperIcon = getFeatureStepperIcon(index);

          return (
          <li key={feature.title} className="relative flex gap-4 py-1 sm:py-1.5">
            <div className="relative flex w-10 shrink-0 flex-col items-center self-stretch">
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-1/2 w-px -translate-x-1/2 bg-brand-border-light"
                  style={{
                    top: "-0.75rem",
                    height: "calc(0.75rem + 0.125rem + 20px + 0.75rem)",
                  }}
                />
              ) : null}
              <span
                aria-hidden
                className="relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-lavender"
              >
                {stepperIcon ? (
                  <Image
                    src={stepperIcon.src}
                    alt=""
                    width={24}
                    height={24}
                    className={stepperIcon.className}
                  />
                ) : null}
              </span>
              {index < features.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-1/2 w-px -translate-x-1/2 bg-brand-border-light"
                  style={{
                    top: "calc(0.125rem + 20px)",
                    bottom: "-0.75rem",
                  }}
                />
              ) : null}
            </div>
            <div className="min-w-0 pt-0.5">
              <h4 className="font-serif text-lg font-bold leading-snug text-black sm:text-xl">
                {feature.title}
              </h4>
              {feature.description ? (
                <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                  {feature.description}
                </p>
              ) : null}
            </div>
          </li>
          );
        })}
        </ul>

        {exclusions ? (
          <p className="px-5 pb-3 pt-2 text-sm font-medium text-brand-gray sm:px-6 sm:pb-4">
            {exclusions}
          </p>
        ) : null}

        {upgradeNudge ? (
          <div className="mx-5 rounded-[16px] border border-brand-lavender bg-[#faf8ff] px-4 py-5 sm:mx-6 sm:px-5 sm:py-6">
            <p className="text-sm italic leading-relaxed text-brand-gray">
              &ldquo;{upgradeNudge}&rdquo;
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
