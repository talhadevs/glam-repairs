"use client";

import { useEffect, useRef, useState } from "react";

// Geometry mirrors the Figma design (Frame 2 coordinate space).
const VIEWBOX = "85 255 480 345";

const GRID_LEFT = 91;
const GRID_RIGHT = 559;
const GRID_TOP = 259;
const GRID_BOTTOM = 587;
const GRID_VERTICAL = [91, 249, 403, 559];
const GRID_HORIZONTAL = [260, 369, 478, 587];
const GRID_COLOR = "#E4E7EC";

// Wave group offset within the Frame (Figma: 539.099 - 405, 458 - 121).
const WAVE_TX = 134.099;
const WAVE_TY = 337;

const WAVE_COLOR = "#EC79A2";

// Exact wave paths exported from Figma (group-local space).
const WAVE_PRIMARY =
  "M396.424 32.7348C396.696 32.361 396.613 31.8378 396.239 31.5662C395.865 31.2947 395.342 31.3777 395.07 31.7515L395.747 32.2432L396.424 32.7348ZM383.26 49.4364L383.937 49.9281L383.26 49.4364ZM368.716 80.5961L369.527 80.7992L368.716 80.5961ZM48.2161 120.012L48.5323 120.786L48.2161 120.012ZM33.6354 132.448L32.9204 132.013L33.6354 132.448ZM188.388 84.3197L188.635 85.1191L188.388 84.3197ZM163.364 107.828L164.146 108.124V108.124L163.364 107.828ZM234.216 102.98L233.481 103.38L234.216 102.98ZM272.099 172.613L271.364 173.013L272.099 172.613ZM272.099 172.613L272.834 172.213L234.951 102.58L234.216 102.98L233.481 103.38L271.364 173.013L272.099 172.613ZM163.364 107.828L162.581 107.532L145.685 152.198L146.467 152.494L147.25 152.79L164.146 108.124L163.364 107.828ZM95.6467 153.862L96.4122 153.524L88.5259 135.647L87.7604 135.985L86.9949 136.323L94.8812 154.2L95.6467 153.862ZM33.6354 132.448L32.9204 132.013L9.95687 169.809L10.6719 170.243L11.3869 170.677L34.3504 132.882L33.6354 132.448ZM395.747 32.2432L395.07 31.7515L382.583 48.9448L383.26 49.4364L383.937 49.9281L396.424 32.7348L395.747 32.2432ZM368.716 80.5961L367.904 80.393L347.293 162.744L348.104 162.947L348.916 163.15L369.527 80.7992L368.716 80.5961ZM383.26 49.4364L382.583 48.9448C375.722 58.3912 370.739 69.0673 367.904 80.393L368.716 80.5961L369.527 80.7992C372.31 69.6813 377.202 59.2012 383.937 49.9281L383.26 49.4364ZM48.2161 120.012L47.8999 119.237C41.6671 121.781 36.4161 126.26 32.9204 132.013L33.6354 132.448L34.3504 132.882C37.6599 127.435 42.6313 123.195 48.5323 120.786L48.2161 120.012ZM87.7604 135.985L88.5259 135.647C81.6591 120.081 63.6513 112.807 47.8999 119.237L48.2161 120.012L48.5323 120.786C63.445 114.699 80.4939 121.586 86.9949 136.323L87.7604 135.985ZM120.777 170.243V169.406C110.226 169.406 100.671 163.178 96.4122 153.524L95.6467 153.862L94.8812 154.2C99.4072 164.459 109.563 171.08 120.777 171.08V170.243ZM146.467 152.494L145.685 152.198C141.767 162.555 131.85 169.406 120.777 169.406V170.243V171.08C132.546 171.08 143.086 163.797 147.25 152.79L146.467 152.494ZM188.388 84.3197L188.142 83.5202C176.372 87.1501 166.939 96.0118 162.581 107.532L163.364 107.828L164.146 108.124C168.321 97.0869 177.359 88.5968 188.635 85.1191L188.388 84.3197ZM234.216 102.98L234.951 102.58C225.874 85.8954 206.293 77.9222 188.142 83.5202L188.388 84.3197L188.635 85.1191C206.025 79.7559 224.784 87.3947 233.481 103.38L234.216 102.98ZM294.663 191.783L294.939 190.993C285.494 187.695 277.615 181.001 272.834 172.213L272.099 172.613L271.364 173.013C276.343 182.166 284.551 189.138 294.388 192.573L294.663 191.783ZM294.663 191.783L294.388 192.573C317.679 200.705 342.926 187.082 348.916 163.15L348.104 162.947L347.293 162.744C341.542 185.721 317.302 198.801 294.939 190.993L294.663 191.783Z";
const WAVE_SECONDARY =
  "M405.92 179.294C406.24 179.613 406.233 180.146 405.904 180.485C405.576 180.824 405.05 180.84 404.73 180.521L405.325 179.907L405.92 179.294ZM378.5 153.163L377.905 153.777L377.887 153.758L377.869 153.738L378.5 153.163ZM50.1599 157.588L49.9588 158.414L50.1599 157.588ZM86.988 134.375L86.1895 134.179L86.988 134.375ZM99.2255 94.4328L98.5235 94.0141L99.2255 94.4328ZM96.0578 101.75L95.2592 101.554L96.0578 101.75ZM147.576 96.8499L146.804 97.1949L147.576 96.8499ZM198.387 167.449L198.258 168.286L198.387 167.449ZM165.746 142.422L164.974 142.767L165.746 142.422ZM303.27 91.058L303.234 91.9008L303.27 91.058ZM261.361 114.286L262.049 114.727L240.623 147.767L239.935 147.326L239.247 146.884L260.673 113.844L261.361 114.286ZM165.746 142.422L164.974 142.767L146.804 97.1949L147.576 96.8499L148.347 96.5049L166.518 142.077L165.746 142.422ZM96.0578 101.75L96.8564 101.945L87.7866 134.57L86.988 134.375L86.1895 134.179L95.2592 101.554L96.0578 101.75ZM33.9675 147.946L33.3268 148.51L5.47881 115.509L6.11951 114.945L6.76021 114.381L34.6082 147.382L33.9675 147.946ZM405.325 179.907L404.73 180.521L377.905 153.777L378.5 153.163L379.096 152.55L405.92 179.294L405.325 179.907ZM378.5 153.163L377.869 153.738L337.095 107.145L337.727 106.57L338.358 105.995L379.132 152.589L378.5 153.163ZM50.1599 157.588L49.9588 158.414C43.4347 157.052 37.6051 153.58 33.3268 148.51L33.9675 147.946L34.6082 147.382C38.6604 152.184 44.1818 155.472 50.3611 156.762L50.1599 157.588ZM86.988 134.375L87.7866 134.57C83.1363 151.298 66.4011 161.847 49.9588 158.414L50.1599 157.588L50.3611 156.762C65.9343 160.014 81.7849 150.023 86.1895 134.179L86.988 134.375ZM99.2255 94.4328L99.9276 94.8515C98.5818 97.07 97.5476 99.4588 96.8564 101.945L96.0578 101.75L95.2592 101.554C95.9939 98.9112 97.0932 96.3722 98.5235 94.0141L99.2255 94.4328ZM147.576 96.8499L146.804 97.1949C138.833 77.2046 111.462 75.8363 99.9276 94.8515L99.2255 94.4328L98.5235 94.0141C110.783 73.8032 139.876 75.2575 148.347 96.5049L147.576 96.8499ZM198.387 167.449L198.258 168.286C183.239 166.545 170.587 156.844 164.974 142.767L165.746 142.422L166.518 142.077C171.914 155.611 184.078 164.937 198.517 166.611L198.387 167.449ZM239.935 147.326L240.623 147.767C231.263 162.201 214.751 170.198 198.258 168.286L198.387 167.449L198.517 166.611C214.373 168.45 230.249 160.761 239.247 146.884L239.935 147.326ZM303.27 91.058L303.234 91.9008C286.84 91.9008 271.248 100.542 262.049 114.727L261.361 114.286L260.673 113.844C270.196 99.1608 286.336 90.2153 303.307 90.2153L303.27 91.058ZM303.27 91.058L303.307 90.2153C316.856 90.2153 329.55 95.9304 338.358 105.995L337.727 106.57L337.095 107.145C328.586 97.4218 316.323 91.9008 303.234 91.9008L303.27 91.058Z";

// End peak (Frame 2 coords = group-local + translate).
const PEAK_BAR = { x: 391.406 + WAVE_TX, y: 10.914 + WAVE_TY, w: 26.033, h: 193.2, rx: 13.0166 };
const PEAK_CX = 404.438 + WAVE_TX;
const PEAK_CY = 24.5 + WAVE_TY;

const SMOOTH_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const GRID_DURATION_MS = 500;

export default function SkinConditionTrendChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [peakVisible, setPeakVisible] = useState(false);

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

  useEffect(() => {
    if (!visible) {
      setPeakVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setPeakVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <div ref={containerRef} className="mx-auto w-full">
      <div className="aspect-[480/345] w-full">
        <svg
          viewBox={VIEWBOX}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Line chart showing skin condition worsening over time without using glam"
        >
          <defs>
            <linearGradient
              id="skin-condition-peak"
              x1="0"
              y1={PEAK_BAR.y}
              x2="0"
              y2={PEAK_BAR.y + PEAK_BAR.h}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#662D91" />
              <stop offset="100%" stopColor="#F2E6FF" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {GRID_HORIZONTAL.map((y, index) => (
            <line
              key={`h-${y}`}
              x1={GRID_LEFT}
              y1={y}
              x2={GRID_RIGHT}
              y2={y}
              stroke={GRID_COLOR}
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
              stroke={GRID_COLOR}
              strokeWidth="1"
              style={{
                opacity: visible ? 1 : 0,
                transition: visible
                  ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE} ${index * 60}ms`
                  : "none",
              }}
            />
          ))}

          {/* Not using glam label */}
          <text
            x={163.8}
            y={422.5}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-black"
            fontSize={20}
            style={{
              letterSpacing: "-1px",
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity ${GRID_DURATION_MS}ms ${SMOOTH_EASE} 200ms` : "none",
            }}
          >
            <tspan x={163.8} dy="-0.6em">
              Not using
            </tspan>
            <tspan x={163.8} dy="1.2em">
              glam
            </tspan>
          </text>

          {/* Wave lines */}
          <g
            style={{
              opacity: visible ? 1 : 0,
              transition: visible ? `opacity 800ms ${SMOOTH_EASE} 150ms` : "none",
            }}
          >
            <g transform={`translate(${WAVE_TX} ${WAVE_TY})`}>
              <path d={WAVE_SECONDARY} fill={WAVE_COLOR} fillOpacity={0.33} />
              <path d={WAVE_PRIMARY} fill={WAVE_COLOR} />
            </g>
          </g>

          {/* End peak */}
          <g
            style={{
              opacity: peakVisible ? 1 : 0,
              transition: peakVisible ? `opacity 480ms ${SMOOTH_EASE}` : "none",
            }}
          >
            <rect
              x={PEAK_BAR.x}
              y={PEAK_BAR.y}
              width={PEAK_BAR.w}
              height={PEAK_BAR.h}
              rx={PEAK_BAR.rx}
              fill="url(#skin-condition-peak)"
            />
            <circle cx={PEAK_CX} cy={PEAK_CY} r={13.5} fill="#DFCAF4" />
            <ellipse cx={PEAK_CX} cy={PEAK_CY - 1} rx={2.17} ry={2.51} fill="black" />
          </g>
        </svg>
      </div>
    </div>
  );
}
