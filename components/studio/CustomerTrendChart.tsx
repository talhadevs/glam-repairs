"use client";

import { useRouter } from "next/navigation";

import { formInputClassName } from "@/components/ui/fieldStyles";
import type {
  CustomerTrendPoint,
  MonthOption,
} from "@/lib/studio/overview";

type CustomerTrendChartProps = {
  points: CustomerTrendPoint[];
  months: MonthOption[];
  selectedMonth: string;
};

const VIEW_WIDTH = 920;
const VIEW_HEIGHT = 420;
const PAD_LEFT = 44;
const PAD_RIGHT = 18;
const PAD_TOP = 18;
const PAD_BOTTOM = 28;
const Y_MAX = 100;
const Y_STEP = 10;

const SERIES = [
  { key: "customers" as const, label: "Customers", color: "#662d91" },
  { key: "reviews" as const, label: "Reviews", color: "#a88ec3" },
  { key: "reports" as const, label: "Reports", color: "#c4a35a" },
];

function linePath(
  values: number[],
  left: number,
  right: number,
  top: number,
  bottom: number,
) {
  if (values.length === 0) return "";
  const width = right - left;
  const height = bottom - top;
  const last = Math.max(values.length - 1, 1);

  return values
    .map((value, index) => {
      const x = left + (index / last) * width;
      const y = bottom - (Math.min(Math.max(value, 0), Y_MAX) / Y_MAX) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function CustomerTrendChart({
  points,
  months,
  selectedMonth,
}: CustomerTrendChartProps) {
  const router = useRouter();
  const plotLeft = PAD_LEFT;
  const plotRight = VIEW_WIDTH - PAD_RIGHT;
  const plotTop = PAD_TOP;
  const plotBottom = VIEW_HEIGHT - PAD_BOTTOM;
  const yTicks = Array.from({ length: Y_MAX / Y_STEP + 1 }, (_, index) => index * Y_STEP);
  const maxCount = Math.max(
    ...points.flatMap((point) => [point.customers, point.reviews, point.reports]),
    0,
  );
  const scale = maxCount > 0 ? Y_MAX / maxCount : 1;
  const xLines = 16;
  const labelIndexes = [
    0,
    Math.floor((points.length - 1) / 2),
    points.length - 1,
  ].filter((index, position, list) => list.indexOf(index) === position);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-xl text-brand-primary">Customers</h2>
          <p className="mt-1 text-sm text-brand-gray">
            Daily customers, reviews, and reports for the selected month.
          </p>
        </div>
        <label className="block text-sm text-brand-gray sm:w-48">
          Month
          <select
            value={selectedMonth}
            onChange={(event) => {
              router.push(`/studio?month=${event.target.value}`);
            }}
            className={`${formInputClassName} mt-2`}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-brand-lavender/70 bg-brand-purple-tint">
        <div className="aspect-[920/420] w-full">
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="h-full w-full"
            role="img"
            aria-label="Line graph of customers, reviews, and reports"
          >
            <defs>
              {SERIES.map((series) => (
                <filter
                  key={series.key}
                  id={`line-glow-${series.key}`}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {Array.from({ length: xLines + 1 }, (_, index) => {
              const x = plotLeft + (index / xLines) * (plotRight - plotLeft);
              return (
                <line
                  key={`v-${index}`}
                  x1={x}
                  x2={x}
                  y1={plotTop}
                  y2={plotBottom}
                  stroke="#d6cdea"
                  strokeWidth="1"
                />
              );
            })}

            {yTicks.map((tick) => {
              const y =
                plotBottom - (tick / Y_MAX) * (plotBottom - plotTop);
              return (
                <g key={tick}>
                  <line
                    x1={plotLeft}
                    x2={plotRight}
                    y1={y}
                    y2={y}
                    stroke={tick === 0 ? "#bda8d4" : "#d6cdea"}
                    strokeWidth={tick === 0 ? 1.4 : 1}
                  />
                  <text
                    x={plotLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill="#4a4a4a"
                    fontSize="11"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {SERIES.map((series) => {
              const values = points.map((point) => point[series.key] * scale);
              return (
                <g key={series.key}>
                  <path
                    d={linePath(values, plotLeft, plotRight, plotTop, plotBottom)}
                    fill="none"
                    stroke={series.color}
                    strokeWidth="5"
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                    opacity="0.18"
                    filter={`url(#line-glow-${series.key})`}
                  />
                  <path
                    d={linePath(values, plotLeft, plotRight, plotTop, plotBottom)}
                    fill="none"
                    stroke={series.color}
                    strokeWidth="2.2"
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                  />
                </g>
              );
            })}

            {labelIndexes.map((index) => {
              const x =
                plotLeft +
                (index / Math.max(points.length - 1, 1)) *
                  (plotRight - plotLeft);
              return (
                <text
                  key={points[index].date}
                  x={x}
                  y={VIEW_HEIGHT - 8}
                  textAnchor="middle"
                  fill="#4a4a4a"
                  fontSize="11"
                >
                  {points[index].label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-brand-gray">
        {SERIES.map((series) => (
          <li key={series.key} className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: series.color }}
            />
            {series.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
