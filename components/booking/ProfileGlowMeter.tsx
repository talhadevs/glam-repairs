type ProfileGlowMeterProps = {
  /** Position along the bar, 0–100. Defaults to the green zone. */
  position?: number;
};

const SEGMENTS = [
  { color: "#F7931E", flex: "1 1 0" },
  { color: "#F9D423", flex: "1 1 0" },
  { color: "#7AC943", flex: "1 1 0" },
] as const;

export default function ProfileGlowMeter({ position = 84 }: ProfileGlowMeterProps) {
  const clampedPosition = Math.min(100, Math.max(0, position));

  return (
    <div className="relative w-full pt-1 pb-7">
      <div
        className="flex h-3.5 overflow-hidden rounded-full sm:h-4"
        aria-hidden
      >
        {SEGMENTS.map((segment) => (
          <span
            key={segment.color}
            className="h-full min-w-0"
            style={{ backgroundColor: segment.color, flex: segment.flex }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute top-0 flex -translate-x-1/2 flex-col items-center"
        style={{ left: `${clampedPosition}%` }}
        aria-hidden
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#7AC943] bg-white shadow-sm sm:h-9 sm:w-9" />
        <span
          className="mt-1.5 h-0 w-0 border-x-[7px] border-b-0 border-t-[9px] border-x-transparent border-t-brand-primary"
        />
      </div>
    </div>
  );
}
