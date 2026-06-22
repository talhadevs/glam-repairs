"use client";

import { useIntersectionAnimation } from "@/lib/hooks/useIntersectionAnimation";

const VIEWBOX_WIDTH = 328;
const VIEWBOX_HEIGHT = 196;

const AXIS_LEFT = 50;
const AXIS_RIGHT = 318;
const AXIS_TOP = 16;
const AXIS_BOTTOM = 148;
const BAR_MAX_HEIGHT = 112;
const BAR_WIDTH = 84;
const BAR_GAP = 8;
const BAR_RX = 10;
const PLOT_LEFT = 50;
const Y_AXIS_LABEL_X = 46;
// Anchor at bottom of label so rotated text sits flush under the chart top.
const Y_AXIS_LABEL_Y = AXIS_TOP + 112;
const BAR_STROKE = "#A88EC3";

const SMOOTH_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const BAR_RISE_DURATION_MS = 850;
const BAR_STAGGER_MS = 120;

const bars = [
  {
    label: "Never",
    percent: 16,
    fill: "#FBEAD8",
  },
  {
    label: "Once a week",
    percent: 34,
    fill: "#DFCAF4",
  },
  {
    label: "Every day",
    percent: 80,
    fill: "#E3ECFD",
  },
] as const;

function barHeight(percent: number) {
  return (percent / 80) * BAR_MAX_HEIGHT;
}

function barX(index: number) {
  return PLOT_LEFT + index * (BAR_WIDTH + BAR_GAP);
}

function barTopY(percent: number) {
  return AXIS_BOTTOM - barHeight(percent);
}

function roundedTopBarPath(x: number, y: number, width: number, height: number, rx: number) {
  const bottom = y + height;
  return [
    `M ${x} ${bottom}`,
    `L ${x} ${y + rx}`,
    `Q ${x} ${y} ${x + rx} ${y}`,
    `L ${x + width - rx} ${y}`,
    `Q ${x + width} ${y} ${x + width} ${y + rx}`,
    `L ${x + width} ${bottom}`,
    "Z",
  ].join(" ");
}

export default function SkinImprovementChart() {
  const [containerRef, visible] = useIntersectionAnimation({ threshold: 0.35 });

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[22rem] sm:max-w-[24rem]">
      <div className="aspect-[328/196] w-full">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Bar chart showing 16 percent skin improvement never, 34 percent once a week, and 80 percent every day"
        >
          <line
            x1={AXIS_LEFT}
            y1={AXIS_TOP}
            x2={AXIS_LEFT}
            y2={AXIS_BOTTOM}
            stroke="#E8E8E8"
            strokeWidth="1"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity 500ms ${SMOOTH_EASE}` : "none",
            }}
          />
          <line
            x1={AXIS_LEFT}
            y1={AXIS_BOTTOM}
            x2={AXIS_RIGHT}
            y2={AXIS_BOTTOM}
            stroke="#E8E8E8"
            strokeWidth="1"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity 500ms ${SMOOTH_EASE}` : "none",
            }}
          />

          <text
            x={Y_AXIS_LABEL_X}
            y={Y_AXIS_LABEL_Y}
            textAnchor="start"
            transform={`rotate(-90 ${Y_AXIS_LABEL_X} ${Y_AXIS_LABEL_Y})`}
            className="fill-brand-ink font-serif text-[11px]"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity 500ms ${SMOOTH_EASE} 120ms` : "none",
            }}
          >
            Skin improvement
          </text>

          {bars.map((bar, index) => {
            const x = barX(index);
            const topY = barTopY(bar.percent);
            const height = barHeight(bar.percent);
            const riseOffset = AXIS_BOTTOM - topY;
            const labelX = x + BAR_WIDTH / 2;

            return (
              <g key={bar.label}>
                <g
                  className="motion-reduce:transform-none motion-reduce:transition-none"
                  style={{
                    transform: visible ? "translateY(0)" : `translateY(${riseOffset}px)`,
                    transition: visible
                      ? `transform ${BAR_RISE_DURATION_MS}ms ${SMOOTH_EASE} ${index * BAR_STAGGER_MS}ms`
                      : "none",
                  }}
                >
                  <path
                    d={roundedTopBarPath(x, topY, BAR_WIDTH, height, BAR_RX)}
                    fill={bar.fill}
                    stroke={BAR_STROKE}
                    strokeWidth="1.5"
                  />
                  <text
                    x={labelX}
                    y={topY + height / 2 + 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-brand-ink text-[11px] font-medium sm:text-xs"
                  >
                    {bar.percent}%
                  </text>
                </g>

                <text
                  x={labelX}
                  y={AXIS_BOTTOM + 18}
                  textAnchor="middle"
                  className="fill-brand-ink text-[10px] sm:text-[11px]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: visible
                      ? `opacity 500ms ${SMOOTH_EASE} ${240 + index * 80}ms`
                      : "none",
                  }}
                >
                  {bar.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
