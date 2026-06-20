"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CameraUploadIcon from "@/components/onboarding/CameraUploadIcon";

const PHOTO_SLOTS = [
  { label: "Front face" },
  { label: "Left/concern" },
  { label: "Right/concern" },
  { label: null },
  { label: null },
  { label: null },
] as const;

type UploadPhotosFooterProps = {
  backHref: string;
  nextHref: string;
};

export function UploadPhotosFooter({ backHref, nextHref }: UploadPhotosFooterProps) {
  return (
    <div>
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

      <p className="mt-4 text-center text-xs leading-relaxed text-brand-gray sm:mt-5 sm:text-[0.8125rem]">
        Your photos are private. Reviewed only by a certified aesthetics professional.
        Never shared.
      </p>
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
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-light">
          Photo Upload
        </p>
        <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]">
          Upload your photos
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]">
          Front face + concern areas. Clear, natural light. No filters.
        </p>
      </header>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:mt-7 sm:gap-3">
        {PHOTO_SLOTS.map((slot, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => openFilePicker(index)}
              aria-label={slot.label ? `Upload ${slot.label} photo` : `Upload photo ${index + 1}`}
              className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] bg-brand-surface-muted transition-opacity hover:opacity-95"
            >
              {photos[index] ? (
                <Image
                  src={photos[index]!}
                  alt={slot.label ? `${slot.label} photo` : `Uploaded skin photo ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 30vw, 120px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center">
                  <CameraUploadIcon />
                </span>
              )}
            </button>

            {slot.label ? (
              <span className="text-center text-[0.6875rem] leading-snug text-brand-gray sm:text-xs">
                {slot.label}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-brand-gray/80 sm:mt-5 sm:text-[0.8125rem]">
        Clarity plan: up to 3. Transform plan: up to 6.
      </p>
    </div>
  );
}
