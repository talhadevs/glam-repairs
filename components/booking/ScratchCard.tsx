"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ScratchCardProps = {
  revealSrc: string;
  revealAlt?: string;
  className?: string;
};

const SCRATCH_RADIUS = 22;
const REVEAL_THRESHOLD = 0.42;

export default function ScratchCard({
  revealSrc,
  revealAlt = "Revealed skin result",
  className = "",
}: ScratchCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratchingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const drawOverlay = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#2b2b2b";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "500 13px var(--font-sans, sans-serif)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch it off", width / 2, height * 0.38);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(width * 0.12, height * 0.72);
    ctx.lineTo(width * 0.88, height * 0.72);
    ctx.stroke();
    ctx.setLineDash([]);
  }, []);

  const getScratchedRatio = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;

    const { width, height } = canvas;
    const pixels = ctx.getImageData(0, 0, width, height).data;
    let transparent = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      total += 1;
      if (pixels[i] === 0) transparent += 1;
    }

    return total > 0 ? transparent / total : 0;
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawOverlay(ctx, rect.width, rect.height);
  }, [drawOverlay, isRevealed]);

  useEffect(() => {
    initCanvas();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(initCanvas);
    observer.observe(container);
    return () => observer.disconnect();
  }, [initCanvas]);

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealed) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, SCRATCH_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      if (getScratchedRatio(canvas) >= REVEAL_THRESHOLD) {
        setIsRevealed(true);
      }
    },
    [getScratchedRatio, isRevealed],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    isScratchingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratchAt(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || isRevealed) return;
    scratchAt(event.clientX, event.clientY);
  };

  const endScratch = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    isScratchingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-brand-ink ${className}`}
    >
      <Image
        src={revealSrc}
        alt={revealAlt}
        fill
        unoptimized
        sizes="(max-width: 640px) 260px, 320px"
        className="object-cover object-center"
      />

      {!isRevealed && (
        <canvas
          ref={canvasRef}
          aria-label="Scratch to reveal your skin result"
          className="absolute inset-0 z-[1] cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endScratch}
          onPointerCancel={endScratch}
        />
      )}
    </div>
  );
}
