"use client";

import { saveOnboardingFirstName } from "@/components/onboarding/onboardingStorage";
import { StepHeader } from "@/components/steps";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

const inputClassName =
  "w-full rounded-2xl border border-brand-border-light/70 bg-white px-4 py-3.5 text-sm text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-gray/45 focus:border-brand-light sm:py-4 sm:text-[15px]";

const labelClassName = "mb-2 block text-sm text-brand-ink sm:text-[0.9375rem]";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type GenderOption = "female" | "male" | "prefer-not-to-say";

const genderOptions: { value: GenderOption; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

function GenderOption({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: GenderOption;
  selected: boolean;
  onSelect: (value: GenderOption) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex items-center gap-2.5 rounded-full px-3 py-1.5 transition-colors ${
        selected ? "bg-brand-light text-white" : "text-brand-gray/70"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          selected
            ? "border-white bg-white"
            : "border-brand-border-light bg-white"
        }`}
      >
        {selected ? (
          <span className="h-2 w-2 rounded-full bg-brand-light" />
        ) : null}
      </span>
      <span className="text-sm sm:text-[15px]">{label}</span>
    </button>
  );
}

export default function AboutYouStep() {
  const [firstName, setFirstName] = useStepAnswer<string>(
    "onboarding.firstName",
    "",
  );
  const [email, setEmail] = useStepAnswer<string>("onboarding.email", "");
  const [age, setAge] = useStepAnswer<string>("onboarding.age", "");
  const [gender, setGender] = useStepAnswer<GenderOption | null>(
    "onboarding.gender",
    null,
  );
  const [city, setCity] = useStepAnswer<string>("onboarding.city", "");
  const setContact = useFunnelStore((state) => state.setContact);

  const emailValid = EMAIL_PATTERN.test(email.trim());

  useStepGate(
    firstName.trim().length > 0 &&
      emailValid &&
      age.trim().length > 0 &&
      gender !== null &&
      city.trim().length > 0,
  );

  return (
    <div>
      <StepHeader eyebrow="About You" title="Let's start with a few basics." />

      <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
        <div>
          <label htmlFor="first-name" className={labelClassName}>
            Name
          </label>
          <input
            id="first-name"
            type="text"
            name="firstName"
            placeholder="Enter name"
            autoComplete="name"
            required
            value={firstName}
            onChange={(event) => {
              const value = event.target.value;
              setFirstName(value);
              saveOnboardingFirstName(value);
              setContact({ fullName: value.trim() });
            }}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="about-email" className={labelClassName}>
            Email
          </label>
          <input
            id="about-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
              setContact({ email: value.trim() });
            }}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="age" className={labelClassName}>
            Age
          </label>
          <input
            id="age"
            type="number"
            name="age"
            placeholder="Enter age"
            min={1}
            max={120}
            inputMode="numeric"
            required
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <p className={labelClassName}>Gender</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
            {genderOptions.map((option) => (
              <GenderOption
                key={option.value}
                label={option.label}
                value={option.value}
                selected={gender === option.value}
                onSelect={setGender}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="city" className={labelClassName}>
            City
          </label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Enter city"
            autoComplete="address-level2"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-brand-gray sm:mt-7 sm:text-[0.8125rem]">
        Your name and email are only used to personalize your report — they are never shared publicly.
      </p>
    </div>
  );
}
