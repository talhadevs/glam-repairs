import Image from "next/image";

const hydrationIcon = "/svgs/Group 2085660787.svg";
const elasticityIcon = "/svgs/Group 2085660786.svg";

const metrics = [
  {
    value: 54,
    label: "Skin hydration",
    icon: hydrationIcon,
  },
  {
    value: 90,
    label: "Skin hydration",
    icon: hydrationIcon,
  },
  {
    value: 32,
    label: "Skin elasticity",
    icon: elasticityIcon,
  },
  {
    value: 84,
    label: "Skin elasticity",
    icon: elasticityIcon,
  },
] as const;

function MetricCard({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-border-light/50 bg-white px-3 py-3 shadow-sm sm:px-3.5 sm:py-3.5">
      <div className="flex items-start gap-2.5 sm:gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-8 sm:w-8">
          <Image
            src={icon}
            alt=""
            width={32}
            height={32}
            className="h-6 w-auto object-contain sm:h-7"
          />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-none text-brand-ink sm:text-[0.9375rem]">
            {value}%
          </p>
          <p className="mt-1 text-[11px] leading-snug text-brand-gray sm:text-xs">
            {label}
          </p>
        </div>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#ECECEC] sm:mt-3 sm:h-2">
        <div
          className="h-full rounded-full bg-[#4EC08B]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function SkinElevatedMetricsGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {metrics.map((metric, index) => (
        <MetricCard
          key={`${metric.label}-${metric.value}-${index}`}
          value={metric.value}
          label={metric.label}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}
