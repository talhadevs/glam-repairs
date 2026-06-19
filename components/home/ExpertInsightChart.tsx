"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const BAR_WIDTH = 55;
const BAR_GAP = 8;
const BAR_BASELINE = 132;
const BAR_MAX_HEIGHT = 124;
const VIEWBOX_TOP = -34;

const GRAPH_OFFSET_X = 18;

const barHeights = [44, 58, 100, 72, 38];

const barXs = barHeights.map(
  (_, index) => 14 + GRAPH_OFFSET_X + index * (BAR_WIDTH + BAR_GAP),
);

function barTopY(height: number) {
  return BAR_BASELINE - (height / 100) * BAR_MAX_HEIGHT;
}

const LINE_OFFSET_X = 5;
const LINE_OFFSET_Y = -2;

const BAR_RX = 6;

function buildLinePath() {
  const tops = barHeights.map((height, index) => ({
    x: barXs[index] + BAR_WIDTH + LINE_OFFSET_X,
    y: barTopY(height) + LINE_OFFSET_Y,
  }));

  const startX = barXs[0] - 10 + LINE_OFFSET_X;
  const radius = BAR_RX;
  let path = `M ${startX} ${tops[0].y} H ${tops[0].x - radius}`;

  for (let index = 0; index < tops.length - 1; index += 1) {
    const { x, y } = tops[index];
    const { y: nextY, x: nextX } = tops[index + 1];
    const steppingDown = nextY > y;

    if (steppingDown) {
      path += ` Q ${x} ${y} ${x} ${y + radius}`;
      path += ` V ${nextY - radius}`;
      path += ` Q ${x} ${nextY} ${x + radius} ${nextY}`;
    } else {
      path += ` Q ${x} ${y} ${x} ${y - radius}`;
      path += ` V ${nextY + radius}`;
      path += ` Q ${x} ${nextY} ${x + radius} ${nextY}`;
    }

    if (index === tops.length - 2) {
      path += ` H ${nextX + 10}`;
    } else {
      path += ` H ${nextX - radius}`;
    }
  }

  return path;
}

const linePath = buildLinePath();

const avatarCx = barXs[2] + BAR_WIDTH / 2;
const avatarCy = barTopY(100) - 22;
const avatarR = 19;

const SMOOTH_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const BAR_STAGGER_MS = 110;
const BAR_RISE_DURATION_MS = 850;
const LINE_START_DELAY_MS =
  (barHeights.length - 1) * BAR_STAGGER_MS + BAR_RISE_DURATION_MS;
const LINE_DRAW_DURATION_MS = 1600;
const AVATAR_FADE_DURATION_MS = 600;

function setLineHidden(path: SVGPathElement, length: number) {
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${-length}`;
}

export default function ExpertInsightChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);
  const pathLengthRef = useRef(0);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [avatarVisible, setAvatarVisible] = useState(false);

  useLayoutEffect(() => {
    const path = linePathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    pathLengthRef.current = length;
    setLineHidden(path, length);
  }, []);

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
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      requestAnimationFrame(() => setVisible(true));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [inView]);

  useEffect(() => {
    if (!visible) {
      setLineVisible(false);
      setAvatarVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setLineVisible(true);
    }, LINE_START_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [visible]);

  useLayoutEffect(() => {
    const path = linePathRef.current;
    const length = pathLengthRef.current;
    if (!path || length <= 0) return;

    path.getAnimations().forEach((runningAnimation) => runningAnimation.cancel());

    if (!lineVisible) {
      setLineHidden(path, length);
      setAvatarVisible(false);
      return;
    }

    setLineHidden(path, length);

    let animation: Animation | undefined;
    let avatarTimer: number | undefined;
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        animation = path.animate(
          [{ strokeDashoffset: -length }, { strokeDashoffset: 0 }],
          {
            duration: LINE_DRAW_DURATION_MS,
            easing: SMOOTH_EASE,
            fill: "forwards",
          },
        );

        avatarTimer = window.setTimeout(() => {
          setAvatarVisible(true);
        }, LINE_DRAW_DURATION_MS - 120);
      });
    });

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      animation?.cancel();
      if (avatarTimer !== undefined) window.clearTimeout(avatarTimer);
    };
  }, [lineVisible]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <svg
        aria-hidden
        className="h-full w-full"
        preserveAspectRatio="xMaxYMax meet"
        viewBox={`0 ${VIEWBOX_TOP} 340 ${136 - VIEWBOX_TOP}`}
      >
        <defs>
          <linearGradient id="expertBarWhite" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0.82" />
            <stop offset="52%" stopColor="var(--background)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="expertBarSkin" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-cream)" stopOpacity="1" />
            <stop offset="52%" stopColor="var(--brand-cream)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--brand-cream)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="expertAvatarClip">
            <circle cx={avatarCx} cy={avatarCy} r={avatarR} />
          </clipPath>
        </defs>

        {barHeights.map((height, index) => {
          const x = barXs[index];
          const y = barTopY(height);
          const barHeight = BAR_BASELINE - y;
          const riseOffset = BAR_BASELINE - y;

          return (
            <g
              key={index}
              className="motion-reduce:transform-none motion-reduce:transition-none"
              style={{
                transform: visible ? "translateY(0)" : `translateY(${riseOffset}px)`,
                transition: visible
                  ? `transform ${BAR_RISE_DURATION_MS}ms ${SMOOTH_EASE} ${index * BAR_STAGGER_MS}ms`
                  : "none",
              }}
            >
              <rect
                fill={index === 2 ? "url(#expertBarSkin)" : "url(#expertBarWhite)"}
                height={barHeight}
                rx={BAR_RX}
                width={BAR_WIDTH}
                x={x}
                y={y}
              />
            </g>
          );
        })}

        <path
          ref={linePathRef}
          d={linePath}
          fill="none"
          stroke="var(--background)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />

        <image
          clipPath="url(#expertAvatarClip)"
          height={avatarR * 2}
          href="/svgs/Group 2085660775.svg"
          preserveAspectRatio="xMidYMid slice"
          width={avatarR * 2}
          x={avatarCx - avatarR}
          y={avatarCy - avatarR}
          className="motion-reduce:opacity-100 motion-reduce:transition-none"
          style={{
            opacity: avatarVisible ? 1 : 0,
            transition: avatarVisible
              ? `opacity ${AVATAR_FADE_DURATION_MS}ms ${SMOOTH_EASE}`
              : "none",
          }}
        />
      </svg>
    </div>
  );
}
