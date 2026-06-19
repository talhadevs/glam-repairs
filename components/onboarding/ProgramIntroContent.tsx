import ProgramIntroHero from "@/components/onboarding/ProgramIntroHero";

const programFeatures = [
  "Extensive product recommendation",
  "Dozens of facelifting techniques",
  "The program include",
  "The program include",
  "The program include",
] as const;

function ProgramFeatureItem({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light/35 text-brand-primary">
        <svg
          aria-hidden
          viewBox="0 0 12 10"
          className="h-2.5 w-3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.2L4.2 8.4L11 1.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm font-light leading-snug text-brand-gray">{label}</span>
    </li>
  );
}

export default function ProgramIntroContent() {
  return (
    <div>
      <ProgramIntroHero />

      <div className="mt-6 sm:mt-7">
        <h1 className="font-serif text-[1.35rem] leading-[1.2] text-brand-ink sm:text-[1.5rem]">
          Welcome to your program with face scan analysis
        </h1>

        <p className="mt-5 text-sm font-semibold text-brand-ink sm:mt-6">
          The program include
        </p>

        <ul className="mt-3 space-y-3 sm:mt-4">
          {programFeatures.map((feature, index) => (
            <ProgramFeatureItem key={`${feature}-${index}`} label={feature} />
          ))}
        </ul>
      </div>
    </div>
  );
}
