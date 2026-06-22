import Image from "next/image";
import ProfileGlowMeter from "@/components/booking/ProfileGlowMeter";
import { StepHeader } from "@/components/steps";

const profileAvatar = "/images,svgs/women_porler.jpg";

const profileSummary = [
  { label: "Sleep", value: "I like to sleep (8+ hours)" },
  { label: "Stress", value: "Yes, every day" },
  { label: "Water intake", value: "I only have coffee or tea" },
  {
    label: "Daily skincare routine",
    value: "Yes, I have a morning and an evening routine",
  },
  { label: "Skin well moisturized", value: "Yes" },
  { label: "Sunscreen outdoors", value: "Yes, always" },
] as const;

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1.5 text-sm text-brand-gray sm:text-[0.9375rem]">{label}</p>
      <div className="rounded-2xl border border-brand-border-light/60 bg-white px-4 py-3.5 shadow-sm sm:px-5 sm:py-4">
        <p className="text-sm leading-snug text-brand-ink sm:text-[0.9375rem]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ProfileReadyStep() {
  return (
    <div>
      <StepHeader title="Your profile is ready" />

      <div className="mt-5 sm:mt-6">
        <ProfileGlowMeter />
      </div>

      <div className="rounded-2xl bg-[#4CD964] px-4 py-4 text-white sm:px-5 sm:py-5">
        <h2 className="text-base font-semibold sm:text-lg">Balanced glow</h2>
        <p className="mt-2 text-sm leading-relaxed sm:text-[0.9375rem]">
          Your routine is generally strong, with only minor adjustments needed.
          Focusing on consistent hydration and SPF can elevate your skin health
          further.
        </p>
      </div>

      <div className="mt-5 flex justify-center sm:mt-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-sm sm:h-28 sm:w-28">
          <Image
            src={profileAvatar}
            alt="Your profile"
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
        {profileSummary.map((item) => (
          <SummaryField key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
