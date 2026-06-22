import Image from "next/image";

const profileDetails = [
  { label: "Tone: Fair", color: "#F8DCC8" },
  { label: "Undertone: Neutral", color: "#D4A574" },
] as const;

const skinInsights = [
  {
    label: "Hydration balance",
    icon: "/svgs/Group (6).svg",
  },
  {
    label: "Barrier support",
    icon: "/svgs/Group (7).svg",
  },
  {
    label: "Consistency matters",
    icon: "/svgs/Group 2085660895.svg",
  },
] as const;

function ProfileDetailCard({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-brand-border-light/60 bg-white px-4 py-3.5 shadow-sm sm:gap-5 sm:px-5 sm:py-4">
      <span
        className="h-9 w-9 shrink-0 rounded-full border border-black/5 sm:h-10 sm:w-10"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <span className="text-sm text-brand-ink sm:text-[0.9375rem]">{label}</span>
    </div>
  );
}

function SkinInsightCard({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-brand-border-light/60 bg-white px-3.5 py-3 shadow-sm sm:gap-4 sm:px-4 sm:py-3.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9">
        <Image
          src={icon}
          alt=""
          width={36}
          height={36}
          className="h-7 w-auto object-contain sm:h-8"
        />
      </span>
      <span className="text-sm text-brand-ink sm:text-[0.9375rem]">{label}</span>
    </div>
  );
}

export default function SkinProfileStep() {
  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Your skin need balanced hydration &amp; protection
        </h1>
      </header>

      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
        {profileDetails.map((detail) => (
          <ProfileDetailCard
            key={detail.label}
            label={detail.label}
            color={detail.color}
          />
        ))}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-brand-gray sm:mt-5 sm:text-[0.9375rem]">
        Neutral undertones benefit most from maintaining a strong balanced
      </p>

      <div className="mt-5 sm:mt-6">
        <h2 className="text-sm font-semibold text-brand-ink sm:text-[0.9375rem]">
          What this means for your skin:
        </h2>

        <div className="mt-3 space-y-2.5 sm:mt-3.5 sm:space-y-3">
          {skinInsights.map((insight) => (
            <SkinInsightCard
              key={insight.label}
              label={insight.label}
              icon={insight.icon}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-brand-gray sm:mt-5 sm:text-[0.9375rem]">
        We&apos;ll focus on maintaining balance and protecting your skin for
        healthy, long-lasting results
      </p>
    </div>
  );
}
