"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const VIEWBOX_WIDTH = 360;
const VIEWBOX_HEIGHT = 172;

const GRID_LEFT = 10;
const GRID_RIGHT = 350;
const GRID_TOP = 28;
const GRID_BOTTOM = 154;

const ROW_HEIGHT = (GRID_BOTTOM - GRID_TOP) / 3;
const COL_WIDTH = (GRID_RIGHT - GRID_LEFT) / 3;

const GRID_HORIZONTAL = [
  GRID_TOP,
  GRID_TOP + ROW_HEIGHT,
  GRID_TOP + ROW_HEIGHT * 2,
  GRID_BOTTOM,
];

const GRID_VERTICAL = [
  GRID_LEFT,
  GRID_LEFT + COL_WIDTH,
  GRID_LEFT + COL_WIDTH * 2,
  GRID_RIGHT,
];

/** Intersection knots shared by both wave lines */
const INTERSECTIONS = [
  { x: 74, y: 58 },
  { x: 150, y: 110 },
  { x: 226, y: 56 },
] as const;

const ENDPOINT = { x: 344, y: 22 };
const PEAK_BAR = {
  x: ENDPOINT.x - 13,
  width: 26,
  top: ENDPOINT.y,
  bottom: GRID_BOTTOM - 4,
};

const PRIMARY_POINTS = [
  [GRID_LEFT, 94],
  [42, 72],
  [INTERSECTIONS[0].x, INTERSECTIONS[0].y],
  [108, 118],
  [INTERSECTIONS[1].x, INTERSECTIONS[1].y],
  [188, 74],
  [INTERSECTIONS[2].x, INTERSECTIONS[2].y],
  [294, 52],
  [ENDPOINT.x, ENDPOINT.y],
] as const;

const SECONDARY_POINTS = [
  [GRID_LEFT, 70],
  [42, 88],
  [INTERSECTIONS[0].x, INTERSECTIONS[0].y],
  [108, 46],
  [INTERSECTIONS[1].x, INTERSECTIONS[1].y],
  [188, 124],
  [INTERSECTIONS[2].x, INTERSECTIONS[2].y],
  [294, 88],
  [348, 128],
] as const;

const SMOOTH_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const GRID_DURATION_MS = 500;
const LINE_DURATION_MS = 1400;
const MARKER_STAGGER_MS = 100;

function buildSmoothPath(points: readonly (readonly [number, number])[]) {
  if (points.length === 0) return "";

  const [firstX, firstY] = points[0];
  let path = `M ${firstX} ${firstY}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const [x1, y1] = points[index];
    const [x2, y2] = points[index + 1];
    const midX = (x1 + x2) / 2;
    path += ` C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  }

  return path;
}

const primaryPath = buildSmoothPath(PRIMARY_POINTS);
const secondaryPath = buildSmoothPath(SECONDARY_POINTS);

function setPathHidden(path: SVGPathElement, length: number) {
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
}

export default function SkinConditionTrendChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryLineRef = useRef<SVGPathElement>(null);
  const secondaryLineRef = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);
  const [markersVisible, setMarkersVisible] = useState(false);

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

  useLayoutEffect(() => {
    const primaryLine = primaryLineRef.current;
    const secondaryLine = secondaryLineRef.current;
    if (!primaryLine || !secondaryLine) return;

    const primaryLength = primaryLine.getTotalLength();
    const secondaryLength = secondaryLine.getTotalLength();

    [primaryLine, secondaryLine].forEach((node) => {
      node.getAnimations().forEach((animation) => animation.cancel());
    });

    if (!visible) {
      setPathHidden(primaryLine, primaryLength);
      setPathHidden(secondaryLine, secondaryLength);
      setMarkersVisible(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      primaryLine.style.strokeDasharray = "none";
      primaryLine.style.strokeDashoffset = "0";
      secondaryLine.style.strokeDasharray = "none";
      secondaryLine.style.strokeDashoffset = "0";
      setMarkersVisible(true);
      return;
    }

    setPathHidden(primaryLine, primaryLength);
    setPathHidden(secondaryLine, secondaryLength);
    setMarkersVisible(false);

    let primaryAnimation: Animation | undefined;
    let secondaryAnimation: Animation | undefined;
    let markerTimer: number | undefined;
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        secondaryAnimation = secondaryLine.animate(
          [{ strokeDashoffset: secondaryLength }, { strokeDashoffset: 0 }],
          {
            duration: LINE_DURATION_MS,
            easing: SMOOTH_EASE,
            fill: "forwards",
          },
        );

        primaryAnimation = primaryLine.animate(
          [{ strokeDashoffset: primaryLength }, { strokeDashoffset: 0 }],
          {
            duration: LINE_DURATION_MS,
            delay: 80,
            easing: SMOOTH_EASE,
            fill: "forwards",
          },
        );

        markerTimer = window.setTimeout(() => {
          setMarkersVisible(true);
        }, LINE_DURATION_MS - 180);
      });
    });

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      primaryAnimation?.cancel();
      secondaryAnimation?.cancel();
      if (markerTimer !== undefined) window.clearTimeout(markerTimer);
    };
  }, [visible]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[25rem] sm:max-w-[27.5rem]">
      <div className="aspect-[360/172] w-full">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Line chart showing skin condition worsening over time without using glam"
        >
          <defs>
            <linearGradient id="skin-condition-peak-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7F56D9" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#7F56D9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7F56D9" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="skin-condition-endpoint-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.75" />
              <stop offset="72%" stopColor="#DDD6FE" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0" />
            </radialGradient>
          </defs>

          {GRID_HORIZONTAL.map((y, index) => (
            <line
              key={`h-${y}`}
              x1={GRID_LEFT}
              y1={y}
              x2={GRID_RIGHT}
              y2={y}
              stroke="#E4E7EC"
              strokeWidth="1"
              style={{
                opacity: visible ? 1 : 0,
                transition: visible
                  ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE} ${index * 60}ms`
                  : "none",
              }}
            />
          ))}

          {GRID_VERTICAL.map((x, index) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1={GRID_TOP}
              x2={x}
              y2={GRID_BOTTOM}
              stroke="#E4E7EC"
              strokeWidth="1"
              style={{
                opacity: visible ? 1 : 0,
                transition: visible
                  ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE} ${index * 60}ms`
                  : "none",
              }}
            />
          ))}

          <text
            x={18}
            y={18}
            className="fill-brand-ink text-[10px] font-medium sm:text-[11px]"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE}` : "none",
            }}
          >
            Not using glam
          </text>

          <rect
            x={PEAK_BAR.x}
            y={PEAK_BAR.top}
            width={PEAK_BAR.width}
            height={PEAK_BAR.bottom - PEAK_BAR.top}
            rx={PEAK_BAR.width / 2}
            fill="url(#skin-condition-peak-gradient)"
            style={{
              opacity: markersVisible ? 1 : 0,
              transition: markersVisible ? `opacity 500ms ${SMOOTH_EASE}` : "none",
            }}
          />

          <path
            ref={secondaryLineRef}
            d={secondaryPath}
            fill="none"
            stroke="#FDA4AF"
            strokeWidth="4.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.72"
          />

          <path
            ref={primaryLineRef}
            d={primaryPath}
            fill="none"
            stroke="#E11D48"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {INTERSECTIONS.map((marker, index) => (
            <g
              key={`${marker.x}-${marker.y}`}
              style={{
                opacity: markersVisible ? 1 : 0,
                transform: markersVisible ? "scale(1)" : "scale(0.82)",
                transformOrigin: `${marker.x}px ${marker.y}px`,
                transition: markersVisible
                  ? `opacity 420ms ${SMOOTH_EASE} ${index * MARKER_STAGGER_MS}ms, transform 420ms ${SMOOTH_EASE} ${index * MARKER_STAGGER_MS}ms`
                  : "none",
              }}
            >
              <circle
                cx={marker.x}
                cy={marker.y}
                r={10.5}
                fill="#FFFFFF"
                stroke="#7C3AED"
                strokeWidth="2.5"
              />
            </g>
          ))}

          <g
            style={{
              opacity: markersVisible ? 1 : 0,
              transform: markersVisible ? "scale(1)" : "scale(0.82)",
              transformOrigin: `${ENDPOINT.x}px ${ENDPOINT.y}px`,
              transition: markersVisible
                ? `opacity 480ms ${SMOOTH_EASE} 240ms, transform 480ms ${SMOOTH_EASE} 240ms`
                : "none",
            }}
          >
            <circle
              cx={ENDPOINT.x}
              cy={ENDPOINT.y}
              r={17}
              fill="url(#skin-condition-endpoint-glow)"
            />
            <circle
              cx={ENDPOINT.x}
              cy={ENDPOINT.y}
              r={9}
              fill="#DDD6FE"
              stroke="#7C3AED"
              strokeWidth="1.5"
            />
            <circle cx={ENDPOINT.x} cy={ENDPOINT.y} r={2.5} fill="#111111" />
          </g>
        </svg>
      </div>
    </div>
  );
}
