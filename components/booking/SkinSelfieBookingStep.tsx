"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import OnboardingShell from "@/components/onboarding/OnboardingShell";

const selfieIllustration = "/svgs/girl_svg.svg";

type SkinSelfieBookingStepProps = {
  backHref: string;
  nextHref: string;
  currentStep: number;
  totalSteps: number;
};

export default function SkinSelfieBookingStep({
  backHref,
  nextHref,
  currentStep,
  totalSteps,
}: SkinSelfieBookingStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const openCamera = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return URL.createObjectURL(file);
    });

    event.target.value = "";
  };

  return (
    <OnboardingShell
      currentStep={currentStep}
      totalSteps={totalSteps}
      footer={
        <div className="flex items-center justify-between gap-4">
          <Link
            href={backHref}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-border-light bg-white text-brand-gray shadow-sm transition-opacity hover:opacity-80"
          >
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {photoPreview ? (
            <Link
              href={nextHref}
              className="subscribe-fill-btn rounded-full bg-brand-light px-10 py-3 text-xs font-normal uppercase tracking-[0.15em] text-white sm:px-12 sm:py-3.5 sm:text-sm"
            >
              Next
            </Link>
          ) : (
            <button
              type="button"
              onClick={openCamera}
              className="subscribe-fill-btn rounded-full bg-brand-light px-10 py-3 text-xs font-normal uppercase tracking-[0.15em] text-white sm:px-12 sm:py-3.5 sm:text-sm"
            >
              Take a selfie
            </button>
          )}
        </div>
      }
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileChange}
      />

      <div>
        <div className="flex justify-center">
          <div className="relative aspect-[438/484] w-full max-w-[15.5rem] overflow-hidden rounded-2xl sm:max-w-[17.5rem]">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="Your uploaded selfie"
                fill
                sizes="(max-width: 640px) 248px, 280px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <Image
                src={selfieIllustration}
                alt="Smiling woman with a face scanning frame for skin analysis"
                fill
                sizes="(max-width: 640px) 248px, 280px"
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>

        <header className="mt-6 sm:mt-7">
          <h1 className="font-serif text-[1.75rem] leading-snug text-brand-ink sm:text-[2rem]">
            Let&apos;s analyze your skin with a well-lit selfie
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]">
            It&apos;s safe: your selfie won&apos;t be visible to anyone
          </p>
        </header>
      </div>
    </OnboardingShell>
  );
}
