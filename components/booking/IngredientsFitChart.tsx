"use client";

import { useEffect, useRef, useState } from "react";

const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 208;
const CENTER_X = 168;
const CENTER_Y = 74;
const RADIUS = 76;
const SKINCARE_PERCENT = 14;
const SLICE_GAP = 3;
const USABLE_CIRCLE = 360 - SLICE_GAP * 2;
const SKINCARE_ANGLE = (SKINCARE_PERCENT / 100) * USABLE_CIRCLE;
const GLAM_ANGLE = USABLE_CIRCLE - SKINCARE_ANGLE;
const SKINCARE_START = 228;
const SKINCARE_END = SKINCARE_START + SKINCARE_ANGLE;
const GLAM_START = SKINCARE_END + SLICE_GAP;
const GLAM_END = GLAM_START + GLAM_ANGLE;

const SMOOTH_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const AXIS_LEFT = 46;
const AXIS_RIGHT = 284;
const AXIS_TOP = 18;
const AXIS_BOTTOM = 162;

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeSlice(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function labelPosition(startAngle: number, endAngle: number, distance = 0.58) {
  const midAngle = startAngle + (endAngle - startAngle) / 2;
  return polarToCartesian(CENTER_X, CENTER_Y, RADIUS * distance, midAngle);
}

const skincarePath = describeSlice(
  CENTER_X,
  CENTER_Y,
  RADIUS,
  SKINCARE_START,
  SKINCARE_END,
);
const glamPath = describeSlice(CENTER_X, CENTER_Y, RADIUS, GLAM_START, GLAM_END);
const glamLabel = labelPosition(GLAM_START, GLAM_END, 0.5);
const skincareLabel = labelPosition(SKINCARE_START, SKINCARE_END, 0.62);

export default function IngredientsFitChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
          });
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[21rem] sm:max-w-[23rem]">
      <div className="aspect-[320/208] w-full">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Chart showing an 86 percent Glam repair program fit and 14 percent skincare fit"
        >
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

          <text
            x={40}
            y={90}
            transform="rotate(-90 40 90)"
            className="fill-brand-gray text-[10px] sm:text-[11px]"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity 500ms ${SMOOTH_EASE} 120ms` : "none",
            }}
          >
            Program fit
          </text>

          <text
            x={AXIS_RIGHT}
            y={AXIS_BOTTOM + 16}
            textAnchor="end"
            className="fill-brand-gray text-[10px] sm:text-[11px]"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity 500ms ${SMOOTH_EASE} 120ms` : "none",
            }}
          >
            Ingredients fit
          </text>

          <g
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.92)",
              transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
              transition: visible
                ? `opacity 700ms ${SMOOTH_EASE} 180ms, transform 700ms ${SMOOTH_EASE} 180ms`
                : "none",
            }}
          >
            <path d={glamPath} fill="#DFCAF4" />
            <path d={skincarePath} fill="#FD372A" />

            <text
              x={glamLabel.x}
              y={glamLabel.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-[11px] font-medium sm:text-xs"
            >
              Glam repair
            </text>
            <text
              x={skincareLabel.x}
              y={skincareLabel.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-[9px] font-medium sm:text-[10px]"
            >
              Skincare
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
