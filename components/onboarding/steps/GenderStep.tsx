"use client";

import { useState } from "react";
import SelectionOptionCard from "@/components/onboarding/SelectionOptionCard";

type GenderOption = "male" | "female" | "non-binary";

const genderOptions: {
  value: GenderOption;
  label: string;
  icon: string;
}[] = [
  {
    value: "male",
    label: "Male",
    icon: "/svgs/Group 2085660915.svg",
  },
  {
    value: "female",
    label: "Female",
    icon: "/svgs/Group 2085660916.svg",
  },
  {
    value: "non-binary",
    label: "Binary",
    icon: "/svgs/Group 2085660917.svg",
  },
];

export default function GenderStep() {
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);

  return (
    <div>
      <header>
        <h1 className="font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          What gender do you identify?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]">
          Hormones have a big impact on how our skin looks and feels at every
          age
        </p>
      </header>

      <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5">
        {genderOptions.map((option) => (
          <SelectionOptionCard
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedGender === option.value}
            onSelect={() => setSelectedGender(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
