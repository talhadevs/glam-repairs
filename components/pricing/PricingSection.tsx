import PricingCard from "@/components/pricing/PricingCard";
import { pricingPlans } from "@/components/pricing/pricingPlans";

export default function PricingSection() {
  return (
    <section className="bg-white px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14 xl:px-12">
      <div className="mx-auto max-w-[86rem]">
        <header className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-[2.75rem] tracking-normal text-brand-primary sm:text-5xl lg:text-[4.25rem]">
            Pricing
          </h1>
          <p className="mt-4 text-xl font-light leading-snug text-black sm:mt-5 sm:text-2xl lg:text-[1.5rem] lg:leading-[1.35]">
            Skincare consultations built around your skin — not a
            one-size-fits-all routine.
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:mt-14 lg:grid-cols-3 lg:grid-rows-[auto_1fr] lg:items-stretch lg:gap-4 xl:gap-5">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
