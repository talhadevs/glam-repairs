"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const AREA_CLIP_ID = "skin-wellness-area-clip";
const AREA_FILL_ID = "skin-wellness-area-fill";
const VIEWBOX_WIDTH = 400;
const VIEWBOX_HEIGHT = 112;
const PLOT_WIDTH = 340;
const WAVE_SAMPLES = 14;

const chartLeft = (VIEWBOX_WIDTH - PLOT_WIDTH) / 2;
const chartRight = chartLeft + PLOT_WIDTH;
const chartTop = 2;
const chartBottom = 96;
const waveCenterY = 46;
const timeLabelY = 106;

const gridLines = [22, 38, 54, 70];
const WAVE_AMPLITUDE = 28;
const GLAM_LINE_DOT_PATTERN = "2 7";

const SMOOTH_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const GRID_DURATION_MS = 500;
const AREA_DURATION_MS = 1400;
const LINE_DURATION_MS = 1500;
const GLAM_LINE_DELAY_MS = 450;

function buildWavePoints(
  phaseOffset: number,
  amplitude: number,
  centerY = waveCenterY,
  cycles = 1.6,
) {
  return Array.from({ length: WAVE_SAMPLES }, (_, index) => {
    const progress = index / (WAVE_SAMPLES - 1);
    const x = chartLeft + progress * PLOT_WIDTH;
    const y =
      centerY +
      amplitude * Math.sin(progress * Math.PI * 2 * cycles + phaseOffset);
    return [x, y] as const;
  });
}

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

const averagePoints = buildWavePoints(0.35, WAVE_AMPLITUDE);
const glamPoints = buildWavePoints(2.1, WAVE_AMPLITUDE);

const averagePath = buildSmoothPath(averagePoints);
const glamPath = buildSmoothPath(glamPoints);
const averageAreaPath = `${averagePath} L ${chartRight} ${chartBottom} L ${chartLeft} ${chartBottom} Z`;

function setPathHidden(path: SVGPathElement, length: number) {
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
}

export default function SkinWellnessChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const averageLineRef = useRef<SVGPathElement>(null);
  const glamLineRef = useRef<SVGPathElement>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [legendVisible, setLegendVisible] = useState(false);
  const [glamDashed, setGlamDashed] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setInView(true));
          });
        } else {
          setInView(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setVisible(false);
      setLegendVisible(false);
      setGlamDashed(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, [inView]);

  useLayoutEffect(() => {
    const averageLine = averageLineRef.current;
    const glamLine = glamLineRef.current;
    const clipRect = clipRectRef.current;

    if (!averageLine || !glamLine || !clipRect) return;

    const averageLength = averageLine.getTotalLength();
    const glamLength = glamLine.getTotalLength();
    const chartWidth = chartRight - chartLeft;

    [averageLine, glamLine, clipRect].forEach((node) => {
      node.getAnimations().forEach((animation) => animation.cancel());
    });

    if (!visible) {
      setPathHidden(averageLine, averageLength);
      setPathHidden(glamLine, glamLength);
      glamLine.style.strokeDasharray = `${glamLength}`;
      clipRect.setAttribute("width", "0");
      setLegendVisible(false);
      setGlamDashed(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      averageLine.style.strokeDasharray = "none";
      averageLine.style.strokeDashoffset = "0";
      glamLine.style.strokeDasharray = GLAM_LINE_DOT_PATTERN;
      glamLine.style.strokeDashoffset = "0";
      clipRect.setAttribute("width", String(chartWidth));
      setLegendVisible(true);
      setGlamDashed(true);
      return;
    }

    setPathHidden(averageLine, averageLength);
    setPathHidden(glamLine, glamLength);
    glamLine.style.strokeDasharray = `${glamLength}`;
    clipRect.setAttribute("width", "0");
    setLegendVisible(false);
    setGlamDashed(false);

    let averageAnimation: Animation | undefined;
    let areaAnimation: Animation | undefined;
    let glamAnimation: Animation | undefined;
    let legendTimer: number | undefined;
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        areaAnimation = clipRect.animate(
          [{ width: 0 }, { width: chartWidth }],
          {
            duration: AREA_DURATION_MS,
            easing: SMOOTH_EASE,
            fill: "forwards",
          },
        );

        averageAnimation = averageLine.animate(
          [{ strokeDashoffset: averageLength }, { strokeDashoffset: 0 }],
          {
            duration: LINE_DURATION_MS,
            easing: SMOOTH_EASE,
            fill: "forwards",
          },
        );

        glamAnimation = glamLine.animate(
          [{ strokeDashoffset: glamLength }, { strokeDashoffset: 0 }],
          {
            duration: LINE_DURATION_MS,
            delay: GLAM_LINE_DELAY_MS,
            easing: SMOOTH_EASE,
            fill: "forwards",
          },
        );

        legendTimer = window.setTimeout(() => {
          setLegendVisible(true);
          setGlamDashed(true);
        }, GLAM_LINE_DELAY_MS + LINE_DURATION_MS - 120);
      });
    });

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      averageAnimation?.cancel();
      areaAnimation?.cancel();
      glamAnimation?.cancel();
      if (legendTimer !== undefined) window.clearTimeout(legendTimer);
    };
  }, [visible]);

  useEffect(() => {
    const glamLine = glamLineRef.current;
    if (!glamLine || !glamDashed) return;
    glamLine.style.strokeDasharray = GLAM_LINE_DOT_PATTERN;
    glamLine.style.strokeDashoffset = "0";
  }, [glamDashed]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[26rem] sm:max-w-[30rem]">
      <div className="aspect-[400/112] w-full">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMin meet"
          role="img"
          aria-label="Chart comparing Glam repair skin wellness progress against the average over time"
        >
        <defs>
          <linearGradient id={AREA_FILL_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D6CDEA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D6CDEA" stopOpacity="0" />
          </linearGradient>
          <clipPath id={AREA_CLIP_ID}>
            <rect
              ref={clipRectRef}
              x={chartLeft}
              y={chartTop}
              height={chartBottom - chartTop}
              width={0}
            />
          </clipPath>
        </defs>

        {gridLines.map((y, index) => (
          <line
            key={y}
            x1={chartLeft}
            y1={y}
            x2={chartRight}
            y2={y}
            stroke="#E8E8E8"
            strokeWidth="1"
            className="motion-reduce:opacity-100 motion-reduce:transition-none"
            style={{
              opacity: visible ? 1 : 0,
              transition: visible
                ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE} ${index * 80}ms`
                : "none",
            }}
          />
        ))}

        <path
          d={averageAreaPath}
          fill={`url(#${AREA_FILL_ID})`}
          clipPath={`url(#${AREA_CLIP_ID})`}
        />

        <path
          ref={averageLineRef}
          d={averagePath}
          fill="none"
          stroke="#CFCFCF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          ref={glamLineRef}
          d={glamPath}
          fill="none"
          stroke="#662D91"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={glamDashed ? GLAM_LINE_DOT_PATTERN : undefined}
        />

        <text
          x={chartLeft}
          y={timeLabelY}
          className="fill-brand-gray text-[10px] sm:text-[11px]"
          style={{
            opacity: visible ? 1 : 0,
            transition: visible
              ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE} 320ms`
              : "none",
          }}
        >
          Time
        </text>
        </svg>
      </div>

      <div
        className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[10px] text-brand-gray sm:text-[11px]"
        style={{
          opacity: legendVisible ? 1 : 0,
          transform: legendVisible ? "translateY(0)" : "translateY(6px)",
          transition: legendVisible
            ? `opacity 500ms ${SMOOTH_EASE}, transform 500ms ${SMOOTH_EASE}`
            : "none",
        }}
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" aria-hidden />
          Glam repair
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#CFCFCF]" aria-hidden />
          On average
        </span>
      </div>
    </div>
  );
}
