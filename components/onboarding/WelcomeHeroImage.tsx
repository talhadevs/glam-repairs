import Image from "next/image";
import ConcernPill from "@/components/home/ConcernPill";

const welcomeFaceImage = "/svgs/Rectangle 3467689.svg";

const welcomePillProps = {
  paddingClassName: "py-0.5 pl-1 pr-2 sm:py-1 sm:pl-1.5 sm:pr-2.5",
  iconWrapSizeClassName: "h-6 w-6 sm:h-7 sm:w-7",
  iconImageClassName: "h-3 w-3 sm:h-3.5 sm:w-3.5",
  labelClassName:
    "shrink-0 whitespace-nowrap pl-1.5 text-[14px] font-normal uppercase tracking-wide text-brand-primary sm:pl-2 sm:text-[16px]",
} as const;

export default function WelcomeHeroImage() {
  return (
    <div className="relative mx-auto w-[9.5rem] overflow-visible sm:w-[10.5rem]">
      <Image
        src={welcomeFaceImage}
        alt="Close-up of glowing skin with freckles"
        width={224}
        height={298}
        priority
        className="h-auto w-full"
      />

      <ConcernPill
        label="ACNE SCARS"
        icon="/svgs/Vector (5).svg"
        widthClassName="w-auto"
        {...welcomePillProps}
        className="absolute left-0 top-[58%] z-10 -translate-x-[70%] sm:top-[60%] sm:-translate-x-[75%]"
      />
      <ConcernPill
        label="ACNE SCARS"
        icon="/svgs/Vector (5).svg"
        widthClassName="w-auto"
        {...welcomePillProps}
        className="absolute right-0 top-[14%] z-10 translate-x-[70%] sm:translate-x-[75%]"
      />
    </div>
  );
}
