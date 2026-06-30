"use client";

import Image from "next/image";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";

const profileAvatar = "/images,svgs/women_porler.jpg";

const skinMetrics = [
  { label: "Hydration", value: 54, color: "#5B9BD5" },
  { label: "Elasticity", value: 32, color: "#4EC08B" },
  { label: "Complexion", value: 68, color: "#ED6EA8" },
  { label: "Texture", value: 52, color: "#F5A623" },
] as const;

function MetricBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[11px] text-brand-ink sm:text-xs">{label}</span>
        <span className="text-[11px] font-medium text-brand-ink sm:text-xs">
          {value}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#ECECEC] sm:h-2.5">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function SkinMetricsPanel() {
  const selfie = useFunnelStore(
    (state) => state.answers["booking.selfie"] as string | undefined,
  );
  const avatar = selfie ?? profileAvatar;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-brand-border-light/50 bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
      <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
        <Image
          src={avatar}
          alt="Your profile"
          fill
          unoptimized
          sizes="(max-width: 640px) 88px, 96px"
          className="object-cover object-center"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-2.5 sm:space-y-3">
        {skinMetrics.map((metric) => (
          <MetricBar
            key={metric.label}
            label={metric.label}
            value={metric.value}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  );
}
