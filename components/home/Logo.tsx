import Image from "next/image";

/** Shared navbar logo heights: mobile → sm → md (iPad) → lg (desktop) → xl */
export const NAVBAR_LOGO_CLASS =
  "h-12 sm:h-14 md:h-16 lg:h-[4.5rem] xl:h-[5.25rem]";

/**
 * The white logo artwork only fills ~59% of its box, while the color logo fills
 * ~93%. To make the color logo's visible size match the white one, its box is
 * sized to ~63% of NAVBAR_LOGO_CLASS.
 */
export const NAVBAR_LOGO_COLOR_CLASS =
  "h-[30px] sm:h-[35px] md:h-10 lg:h-[45px] xl:h-[53px]";

type LogoProps = {
  className?: string;
  variant?: "white" | "color";
};

const LOGO_SRC = {
  white: "/svgs/logo_white.svg",
  color: "/svgs/GLAM REPAIR LOGO-08 2 (1).svg",
} as const;

export default function Logo({ className = "", variant = "white" }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt="Glam Repairs"
      width={230}
      height={80}
      priority
      className={`w-auto ${className}`.trim()}
    />
  );
}
