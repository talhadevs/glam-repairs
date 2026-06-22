"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CameraUploadIcon from "@/components/onboarding/CameraUploadIcon";
import { StepHeader } from "@/components/steps";

const PHOTO_SLOTS = [
  {
    label: "Front face",
    illustration: "/svgs/ChatGPT Image Jun 22, 2026, 12_52_18 PM1 1.svg",
  },
  {
    label: "Left/concern",
    illustration: "/svgs/ChatGPT Image Jun 22, 2026, 12_52_18 PMed 2.svg",
  },
  {
    label: "Right/concern",
    illustration: "/svgs/ChatGPT Image Jun 22, 2026, 12_52_18 PMed 2 (1).svg",
  },
  {
    label: "3/4 left",
    illustration: "/svgs/ChatGPT Image Jun 22, 2026, 12_52_18 11 4.svg",
    flip: true,
  },
  {
    label: "3/4 right",
    illustration: "/svgs/ChatGPT Image Jun 22, 2026, 12_52_18 11 4.svg",
  },
  {
    label: "from below",
    illustration: "/svgs/ChatGPT Image Jun 22, 2026, 12_52_18 1 1.svg",
  },
] as const;

function InfoIcon() {
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-light text-[10px] font-semibold leading-none text-white sm:h-[1.125rem] sm:w-[1.125rem] sm:text-[11px]">
      i
    </span>
  );
}

function PrivacyShieldIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 18"
      className="h-4 w-4 shrink-0 text-brand-light"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.75L1.75 3.25V8.25C1.75 12.05 4.55 15.55 8 16.75C11.45 15.55 14.25 12.05 14.25 8.25V3.25L8 0.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 9.25L7.25 10.75L10.5 7.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type UploadPhotosFooterProps = {
  backHref: string;
  nextHref: string;
};

export function UploadPhotosFooter({ backHref, nextHref }: UploadPhotosFooterProps) {
  return (
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

      <Link
        href={nextHref}
        className="subscribe-fill-btn flex-1 rounded-full bg-brand-light px-6 py-3 text-center text-xs font-normal uppercase tracking-[0.15em] text-white sm:py-3.5 sm:text-sm"
      >
        Upload Photos
      </Link>
    </div>
  );
}

export default function UploadPhotosStep() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [photos, setPhotos] = useState<(string | null)[]>(
    Array(PHOTO_SLOTS.length).fill(null),
  );
  const photosRef = useRef<(string | null)[]>([]);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      for (const photoUrl of photosRef.current) {
        if (photoUrl) {
          URL.revokeObjectURL(photoUrl);
        }
      }
    };
  }, []);

  const openFilePicker = (index: number) => {
    setActiveSlot(index);
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && activeSlot !== null) {
      const previewUrl = URL.createObjectURL(file);
      setPhotos((current) => {
        const next = [...current];
        if (next[activeSlot]) {
          URL.revokeObjectURL(next[activeSlot]!);
        }
        next[activeSlot] = previewUrl;
        return next;
      });
    }
    event.target.value = "";
    setActiveSlot(null);
  };

  return (
    <div>
      <StepHeader
        title="Upload your photos"
        subtitle="Front face + concern areas. Clear, natural light. No filters."
        subtitleClassName="mt-2 text-sm leading-relaxed text-brand-gray sm:mt-2.5 sm:text-[0.9375rem]"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:mt-7 sm:gap-3">
        {PHOTO_SLOTS.map((slot, index) => (
          <div key={slot.label} className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => openFilePicker(index)}
              aria-label={`Upload ${slot.label} photo`}
              className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] border border-brand-border-light/50 bg-white shadow-sm transition-opacity hover:opacity-95"
            >
              {photos[index] ? (
                <Image
                  src={photos[index]!}
                  alt={`${slot.label} photo`}
                  fill
                  sizes="(max-width: 640px) 30vw, 120px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <>
                  <span className="pointer-events-none absolute left-2 top-2 z-[1]">
                    <InfoIcon />
                  </span>

                  <span className="absolute inset-x-0 bottom-6 top-5 flex items-end justify-center px-1.5 sm:bottom-7 sm:top-6">
                    <Image
                      src={slot.illustration}
                      alt=""
                      width={80}
                      height={115}
                      unoptimized
                      className={`h-auto max-h-full w-auto max-w-[72%] object-contain object-bottom ${
                        "flip" in slot && slot.flip ? "-scale-x-100" : ""
                      }`}
                    />
                  </span>

                  <span className="pointer-events-none absolute bottom-2 right-2 z-[1] sm:bottom-2.5 sm:right-2.5">
                    <CameraUploadIcon />
                  </span>
                </>
              )}
            </button>

            <span className="text-center text-[0.6875rem] leading-snug text-brand-gray sm:text-xs">
              {slot.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-brand-border-light/50 bg-white px-3 py-2.5 shadow-sm sm:mt-6 sm:gap-2.5 sm:px-4 sm:py-3">
        <PrivacyShieldIcon />
        <p className="text-[0.6875rem] leading-snug text-brand-gray sm:text-xs">
          Private. Reviewed only by certified professionals. Never shared.
        </p>
      </div>
    </div>
  );
}
