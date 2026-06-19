import Link from "next/link";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import WelcomeHeroImage from "@/components/onboarding/WelcomeHeroImage";

export default function WelcomeScreen() {
  return (
    <OnboardingShell
      showProgress={false}
      footer={
        <Link
          href="/onboarding/program"
          className="subscribe-fill-btn block w-full rounded-full bg-brand-light px-6 py-3 text-center text-xs font-normal tracking-[0.08em] text-white sm:py-3.5 sm:text-sm"
        >
          Get My Skin Guidance →
        </Link>
      }
    >
      <WelcomeHeroImage />

      <div className="mt-7 text-center sm:mt-8">
        <h1 className="font-serif text-[1.75rem] leading-none text-brand-primary sm:text-[2rem]">
          Welcome
        </h1>
        <p className="mx-auto mt-3 max-w-[18rem] text-sm font-normal leading-relaxed text-brand-ink sm:mt-3.5 sm:max-w-none sm:text-[0.9375rem]">
          Tell us what your skin is going through. We&apos;ll guide you with a
          simple, routine-based report.
        </p>
      </div>
    </OnboardingShell>
  );
}
