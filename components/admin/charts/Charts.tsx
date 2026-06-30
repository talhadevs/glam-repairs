import type { MonthlyPoint } from "@/lib/admin/dashboardData";

const COLORS = {
  primary: "#662d91",
  accent: "#a88ec3",
  light: "#bda8d4",
  lavender: "#d6cdea",
  soft: "#f6edff",
};

export function MiniBars({
  values,
  tone = "accent",
}: {
  values: number[];
  tone?: "accent" | "light" | "white";
}) {
  const max = Math.max(...values, 1);
  const fill =
    tone === "white"
      ? "bg-white/70"
      : tone === "light"
        ? "bg-brand-light"
        : "bg-brand-accent";
  return (
    <div className="flex h-9 items-end gap-1">
      {values.map((value, index) => (
        <span
          key={index}
          className={`w-1.5 rounded-sm ${fill}`}
          style={{ height: `${Math.max((value / max) * 100, 12)}%` }}
        />
      ))}
    </div>
  );
}

export function Gauge({
  value,
  total,
  label,
}: {
  value: number;
  total: number;
  label: string;
}) {
  const fraction = total > 0 ? Math.min(value / total, 1) : 0;
  const radius = 80;
  const circumference = Math.PI * radius;
  const dash = circumference * fraction;

  return (
    <div className="relative mx-auto w-full max-w-[18rem]">
      <svg viewBox="0 0 200 116" className="w-full">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={COLORS.soft}
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={COLORS.primary}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-1 flex flex-col items-center">
        <span className="font-serif text-4xl text-brand-primary sm:text-5xl">
          {value}
        </span>
        <span className="text-xs text-brand-gray sm:text-sm">{label}</span>
      </div>
    </div>
  );
}

export function TrendChart({ data }: { data: MonthlyPoint[] }) {
  const width = 640;
  const height = 220;
  const padX = 28;
  const padY = 24;
  const max = Math.max(...data.map((d) => d.value), 1);
  const stepX = (width - padX * 2) / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => {
    const x = padX + i * stepX;
    const y = height - padY - (d.value / max) * (height - padY * 2);
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${
    height - padY
  } L ${points[0].x.toFixed(1)} ${height - padY} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#trendFill)" />
      <path
        d={linePath}
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p) => (
        <g key={p.month}>
          <circle cx={p.x} cy={p.y} r="3.5" fill={COLORS.primary} />
          <text
            x={p.x}
            y={height - 6}
            textAnchor="middle"
            className="fill-brand-gray"
            style={{ fontSize: "11px" }}
          >
            {p.month}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={COLORS.soft}
            strokeWidth="20"
          />
          {segments.map((segment) => {
            const length = (segment.value / total) * circumference;
            const dasharray = `${length} ${circumference - length}`;
            const circle = (
              <circle
                key={segment.label}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="20"
                strokeDasharray={dasharray}
                strokeDashoffset={-offset}
              />
            );
            offset += length;
            return circle;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl text-brand-primary">{total}</span>
          <span className="text-[11px] text-brand-gray">total</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2.5">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm text-brand-ink">{segment.label}</span>
            <span className="text-sm font-medium text-brand-gray">
              {segment.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
