"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import styles from "./TreatmentProgramFitChart.module.css";

/** Row config: label, fill %, track width %, and fill color group */
const chartRows = [
  {
    label: "Smoother skin",
    progress: 35,
    trackWidth: 36,
    markerExtraShift: "3.25rem",
    tone: "purple",
  },
  {
    label: "Reversing wrinkles",
    progress: 55,
    trackWidth: 52,
    markerExtraShift: "3.75rem",
    tone: "purple",
  },
  {
    label: "Your best skin",
    progress: 72,
    trackWidth: 74,
    markerExtraShift: "2.5rem",
    tone: "green",
  },
  {
    label: "Long-lasting look",
    progress: 90,
    trackWidth: 96,
    markerExtraShift: "0rem",
    tone: "green",
  },
] as const;

function markerLeft(trackWidth: number, progress: number, extraShift: string) {
  const anchorPercent = (trackWidth * progress) / 100;
  return `calc(${anchorPercent}% + var(--chart-marker-shift) + ${extraShift})`;
}

type Point = {
  x: number;
  y: number;
};

const DIAGONAL_BOTTOM_OFFSET_X = -2;
const DIAGONAL_EXTEND_BY = 18;

function buildTrendPolyline(
  centers: Point[],
  extendBy = DIAGONAL_EXTEND_BY,
  bottomOffsetX = DIAGONAL_BOTTOM_OFFSET_X,
): string | null {
  if (centers.length < 2) {
    return null;
  }

  const first = centers[0];
  const last = centers[centers.length - 1];
  const dx = last.x - first.x;
  const dy = last.y - first.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return null;
  }

  const unitX = dx / length;
  const unitY = dy / length;

  const points: Point[] = [
    { x: first.x - unitX * extendBy, y: first.y - unitY * extendBy },
    ...centers,
    {
      x: last.x + unitX * extendBy + bottomOffsetX,
      y: last.y + unitY * extendBy,
    },
  ];

  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

export default function TreatmentProgramFitChart() {
  const chartRef = useRef<HTMLElement>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [visible, setVisible] = useState(false);
  const [polylinePoints, setPolylinePoints] = useState<string | null>(null);

  const updateDiagonalLine = useCallback(() => {
    const chart = chartRef.current;
    const markers = markerRefs.current.filter(
      (marker): marker is HTMLSpanElement => marker !== null,
    );

    if (!chart || markers.length < 2) {
      return;
    }

    const chartRect = chart.getBoundingClientRect();
    const centers = markers.map((marker) => {
      const rect = marker.getBoundingClientRect();

      return {
        x: rect.left + rect.width / 2 - chartRect.left,
        y: rect.top + rect.height / 2 - chartRect.top,
      };
    });

    setPolylinePoints(buildTrendPolyline(centers));
  }, []);

  useEffect(() => {
    const element = chartRef.current;
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
    if (!visible) {
      setPolylinePoints(null);
      return;
    }

    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    const syncLine = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(updateDiagonalLine);
      });
    };

    syncLine();

    const settleTimer = window.setTimeout(updateDiagonalLine, 1000);
    window.addEventListener("resize", updateDiagonalLine);

    const annotations = chart.querySelectorAll(`.${styles.annotation}`);
    annotations.forEach((annotation) => {
      annotation.addEventListener("transitionend", updateDiagonalLine);
    });

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", updateDiagonalLine);
      annotations.forEach((annotation) => {
        annotation.removeEventListener("transitionend", updateDiagonalLine);
      });
    };
  }, [visible, updateDiagonalLine]);

  return (
    <section
      ref={chartRef}
      className={`${styles.chart} ${visible ? styles.chartVisible : ""}`}
      aria-label="Skin progress comparison chart"
    >
      {/* Background: diagonal trend line through circle centers + vertical grid */}
      <div className={styles.backdrop} aria-hidden="true">
        <svg className={styles.diagonalSvg}>
          {polylinePoints ? (
            <polyline
              points={polylinePoints}
              className={styles.diagonalLine}
            />
          ) : null}
        </svg>
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className={styles.gridLine} />
          ))}
        </div>
      </div>

      {/* Four stacked progress rows — tracks widen toward the bottom */}
      <ol className={styles.rows}>
        {chartRows.map((row, index) => (
          <li
            key={row.label}
            className={styles.row}
            style={
              {
                "--track-width": `${row.trackWidth}%`,
                "--progress": `${row.progress}%`,
                "--marker-left": markerLeft(
                  row.trackWidth,
                  row.progress,
                  row.markerExtraShift,
                ),
                "--row-delay": `${index * 120}ms`,
              } as CSSProperties
            }
          >
            <div className={styles.trackWrap}>
              <div className={styles.track}>
                <div
                  className={`${styles.fill} ${
                    row.tone === "purple" ? styles.fillPurple : styles.fillGreen
                  }`}
                  style={{ transitionDelay: `var(--row-delay)` }}
                  role="presentation"
                />
              </div>
            </div>

            <div
              className={styles.annotation}
              style={{ transitionDelay: `calc(var(--row-delay) + 180ms)` }}
            >
              <span
                className={styles.marker}
                aria-hidden="true"
                ref={(element) => {
                  markerRefs.current[index] = element;
                }}
              />
              <span className={styles.label}>{row.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
