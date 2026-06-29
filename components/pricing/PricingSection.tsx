import PricingCard from "@/components/pricing/PricingCard";
import { pricingPlans } from "@/components/pricing/pricingPlans";

type PricingSectionProps = {
  title?: string;
  subtitle?: string;
  showTrustLine?: boolean;
};

const defaultTitle = "Pricing";
const defaultSubtitle =
  "Skincare consultations built around your skin — not a one-size-fits-all routine.";

const trustLine =
  "Every paid assessment is manually reviewed by a certified aesthetics professional with a degree in Cosmetology & Dermatology Science.";

export default function PricingSection({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  showTrustLine = false,
}: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="bg-white px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14 xl:px-12"
    >
      <div className="mx-auto max-w-[86rem]">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif italic tracking-normal text-brand-primary text-[2.5rem] sm:text-5xl lg:text-[3.875rem]">
            {title}
          </h2>
          <p className="mt-4 font-sans leading-snug text-brand-ink text-base sm:mt-5 sm:text-lg lg:text-2xl">
            {subtitle}
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:mt-14 lg:grid-cols-3 lg:items-stretch lg:gap-5 xl:gap-6">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {showTrustLine ? (
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-brand-gray sm:mt-12 sm:text-[0.9375rem]">
            {trustLine}
          </p>
        ) : null}
      </div>
    </section>
  );
}
