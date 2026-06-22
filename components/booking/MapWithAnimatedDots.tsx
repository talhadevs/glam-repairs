import Image from "next/image";

const mapDots = [
  { x: 14, y: 34, delay: 0, size: "sm" },
  { x: 18, y: 40, delay: 0.35, size: "md" },
  { x: 22, y: 48, delay: 0.7, size: "sm" },
  { x: 16, y: 56, delay: 1.05, size: "xs" },
  { x: 24, y: 64, delay: 0.2, size: "md" },
  { x: 28, y: 72, delay: 0.55, size: "sm" },
  { x: 32, y: 68, delay: 0.9, size: "xs" },
  { x: 38, y: 28, delay: 0.15, size: "md" },
  { x: 42, y: 34, delay: 0.5, size: "sm" },
  { x: 46, y: 42, delay: 0.85, size: "xs" },
  { x: 44, y: 52, delay: 1.2, size: "md" },
  { x: 48, y: 58, delay: 0.3, size: "sm" },
  { x: 50, y: 48, delay: 0.65, size: "xs" },
  { x: 52, y: 38, delay: 1.0, size: "md" },
  { x: 54, y: 62, delay: 0.25, size: "sm" },
  { x: 56, y: 30, delay: 0.6, size: "xs" },
  { x: 58, y: 44, delay: 0.95, size: "md" },
  { x: 60, y: 52, delay: 0.1, size: "sm" },
  { x: 64, y: 36, delay: 0.45, size: "xs" },
  { x: 68, y: 42, delay: 0.8, size: "md" },
  { x: 72, y: 34, delay: 1.15, size: "sm" },
  { x: 74, y: 48, delay: 0.2, size: "xs" },
  { x: 76, y: 54, delay: 0.55, size: "md" },
  { x: 70, y: 58, delay: 0.9, size: "sm" },
  { x: 78, y: 40, delay: 0.05, size: "xs" },
  { x: 82, y: 66, delay: 0.4, size: "md" },
  { x: 86, y: 72, delay: 0.75, size: "sm" },
  { x: 36, y: 54, delay: 1.1, size: "xs" },
  { x: 40, y: 60, delay: 0.3, size: "sm" },
  { x: 62, y: 64, delay: 0.65, size: "xs" },
] as const;

const dotSizeClasses = {
  xs: "h-1 w-1",
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
} as const;

export default function MapWithAnimatedDots() {
  return (
    <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-[18rem]">
      <Image
        src="/svgs/map.svg"
        alt="World map showing Glam community members"
        width={405}
        height={270}
        className="h-auto w-full object-contain"
        priority
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {mapDots.map((dot, index) => (
          <span
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
          >
            <span
              className={`map-dot block rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.95)] ${dotSizeClasses[dot.size]}`}
              style={{ animationDelay: `${dot.delay}s` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
