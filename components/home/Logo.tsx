import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/svgs/logo_white.svg"
      alt="Glam Repairs"
      width={184}
      height={64}
      priority
      className={`w-auto ${className}`.trim()}
    />
  );
}
