import Image from "next/image";
import { StepHeader } from "@/components/steps";

const wrongPhoto = "/svgs/Rectangle 3467693.svg";
const correctPhoto = "/svgs/Rectangle 3467692.svg";

const photoTips = [
  {
    title: "Tip 1",
    body: "Natural light only — stand near a window. Avoid flash or overhead lights.",
  },
  {
    title: "Tip 2",
    body: "No filters, no makeup — your skin needs to be visible as it is.",
  },
  {
    title: "Tip 3",
    body: "Photos to take:",
    bullets: [
      "Front face (straight on)",
      "Left profile or concern area close-up",
      "Right profile or second concern area",
    ],
  },
  {
    title: "Tip 4",
    body: "Hold the camera at eye level — not above or below.",
  },
] as const;

function PhotoExample({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge: "wrong" | "correct";
}) {
  return (
    <div className="relative aspect-[224/300] w-full overflow-visible rounded-[1.25rem]">
      <div className="absolute inset-0 overflow-hidden rounded-[1.25rem]">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 40vw, 160px" className="object-cover" />
      </div>
      <span
        className={`absolute bottom-0 left-1/2 z-10 flex h-7 w-7 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-white sm:h-8 sm:w-8 ${
          badge === "wrong" ? "bg-brand-error" : "bg-brand-success"
        }`}
      >
        {badge === "wrong" ? (
          <svg aria-hidden viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none">
            <path
              d="M3 3L9 9M9 3L3 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 12 10" className="h-3 w-3.5" fill="none">
            <path
              d="M1 5.2L4.2 8.4L11 1.6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </div>
  );
}

function PhotoTip({
  title,
  body,
  bullets,
}: {
  title: string;
  body: string;
  bullets?: readonly string[];
}) {
  return (
    <li className="space-y-2">
      <p className="text-sm font-medium text-brand-ink sm:text-[0.9375rem]">{title}</p>
      <p className="text-sm font-light leading-relaxed text-brand-gray sm:text-[0.9375rem]">{body}</p>
      {bullets ? (
        <ul className="space-y-1.5 pl-1">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-light leading-relaxed text-brand-gray sm:text-[0.9375rem]">
              <span aria-hidden className="mt-0.5 shrink-0 text-brand-light">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function UploadInstructionStep() {
  return (
    <div>
      <StepHeader
        eyebrow="Photo Guide"
        title="How to take your photos"
        subtitle="Clear photos help a certified aesthetics professional assess your skin accurately. Follow these tips for the best results."
        subtitleClassName="mt-2 text-sm leading-relaxed text-brand-ink sm:mt-2.5 sm:text-[0.9375rem]"
      />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4">
        <PhotoExample
          src={wrongPhoto}
          alt="Example of an incorrect skin photo with mirror selfie"
          badge="wrong"
        />
        <PhotoExample
          src={correctPhoto}
          alt="Example of a correct skin photo with natural light"
          badge="correct"
        />
      </div>

      <ul className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
        {photoTips.map((tip) => (
          <PhotoTip key={tip.title} title={tip.title} body={tip.body} bullets={"bullets" in tip ? tip.bullets : undefined} />
        ))}
      </ul>

      <p className="mt-6 text-sm font-medium text-brand-ink sm:mt-7 sm:text-[0.9375rem]">
        Ready? Tap Next to upload.
      </p>
    </div>
  );
}
