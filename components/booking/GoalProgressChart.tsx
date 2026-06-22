"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const VIEWBOX_WIDTH = 360;
const VIEWBOX_HEIGHT = 158;

const GRID_LEFT = 8;
const GRID_RIGHT = 352;
const GRID_TOP = 8;
const GRID_BOTTOM = 120;
const LABEL_Y = 138;

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

const MARKERS = [
  { x: 88, y: 96 },
  { x: 168, y: 78 },
  { x: 248, y: 58 },
  { x: 310, y: 34 },
] as const;

const LINE_END = { x: GRID_RIGHT, y: 20 };

const CURVE_POINTS = [
  [GRID_LEFT, 114],
  [44, 108],
  [MARKERS[0].x, MARKERS[0].y],
  [124, 106],
  [MARKERS[1].x, MARKERS[1].y],
  [204, 86],
  [MARKERS[2].x, MARKERS[2].y],
  [278, 48],
  [MARKERS[3].x, MARKERS[3].y],
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

const linePath = `${buildSmoothPath(CURVE_POINTS)} L ${LINE_END.x} ${LINE_END.y}`;
const areaPath = `${linePath} L ${GRID_RIGHT} ${GRID_BOTTOM} L ${GRID_LEFT} ${GRID_BOTTOM} Z`;

function setPathHidden(path: SVGPathElement, length: number) {
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
}

export default function GoalProgressChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);
  const [markersVisible, setMarkersVisible] = useState(false);
  const [areaVisible, setAreaVisible] = useState(false);

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
    const line = lineRef.current;
    if (!line) return;

    const lineLength = line.getTotalLength();
    line.getAnimations().forEach((animation) => animation.cancel());

    if (!visible) {
      setPathHidden(line, lineLength);
      setMarkersVisible(false);
      setAreaVisible(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      line.style.strokeDasharray = "none";
      line.style.strokeDashoffset = "0";
      setMarkersVisible(true);
      setAreaVisible(true);
      return;
    }

    setPathHidden(line, lineLength);
    setMarkersVisible(false);
    setAreaVisible(false);

    let lineAnimation: Animation | undefined;
    let markerTimer: number | undefined;
    let areaTimer: number | undefined;
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        lineAnimation = line.animate(
          [{ strokeDashoffset: lineLength }, { strokeDashoffset: 0 }],
          {
            duration: LINE_DURATION_MS,
            easing: SMOOTH_EASE,
            fill: "forwards",
          },
        );

        areaTimer = window.setTimeout(() => {
          setAreaVisible(true);
        }, LINE_DURATION_MS * 0.35);

        markerTimer = window.setTimeout(() => {
          setMarkersVisible(true);
        }, LINE_DURATION_MS - 160);
      });
    });

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      lineAnimation?.cancel();
      if (markerTimer !== undefined) window.clearTimeout(markerTimer);
      if (areaTimer !== undefined) window.clearTimeout(areaTimer);
    };
  }, [visible]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[25rem] sm:max-w-[27.5rem]">
      <div className="aspect-[360/158] w-full">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Goal progress chart from June 10 to July 10 showing improving skin results"
        >
          <defs>
            <linearGradient
              id="goal-progress-line-gradient"
              x1={GRID_LEFT}
              y1="0"
              x2={GRID_RIGHT}
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FBCFE8" stopOpacity="0.55" />
              <stop offset="28%" stopColor="#FDA4AF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FF3366" />
            </linearGradient>
            <linearGradient
              id="goal-progress-area-gradient"
              x1="0"
              y1={GRID_TOP}
              x2="0"
              y2={GRID_BOTTOM}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FF4D88" stopOpacity="0.42" />
              <stop offset="55%" stopColor="#FF4D88" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#FF4D88" stopOpacity="0" />
            </linearGradient>
          </defs>

          {GRID_HORIZONTAL.map((y, index) => (
            <line
              key={`h-${y}`}
              x1={GRID_LEFT}
              y1={y}
              x2={GRID_RIGHT}
              y2={y}
              stroke="#D5D5D5"
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
              stroke="#D5D5D5"
              strokeWidth="1"
              style={{
                opacity: visible ? 1 : 0,
                transition: visible
                  ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE} ${index * 60}ms`
                  : "none",
              }}
            />
          ))}

          <path
            d={areaPath}
            fill="url(#goal-progress-area-gradient)"
            style={{
              opacity: areaVisible ? 1 : 0,
              transition: areaVisible ? `opacity 700ms ${SMOOTH_EASE}` : "none",
            }}
          />

          <path
            ref={lineRef}
            d={linePath}
            fill="none"
            stroke="url(#goal-progress-line-gradient)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {MARKERS.map((marker, index) => (
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
                r={8}
                fill="#FFFFFF"
                stroke="#6A2C91"
                strokeWidth="2"
              />
            </g>
          ))}

          <text
            x={GRID_LEFT}
            y={LABEL_Y}
            className="fill-brand-ink text-[10px] sm:text-[11px]"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE}` : "none",
            }}
          >
            06/10/2026
          </text>
          <text
            x={GRID_RIGHT}
            y={LABEL_Y}
            textAnchor="end"
            className="fill-brand-ink text-[10px] sm:text-[11px]"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE}` : "none",
            }}
          >
            07/10/2026
          </text>
        </svg>
      </div>
    </div>
  );
}
