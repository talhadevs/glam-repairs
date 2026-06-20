"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EXIT_ANIMATION_MS = 400;

type NotificationVariant = "success" | "error";

type NotificationProps = {
  isOpen: boolean;
  message: string;
  onDismiss: () => void;
  duration?: number;
  variant?: NotificationVariant;
};

const variantStyles: Record<NotificationVariant, string> = {
  success: "border-brand-success/30 bg-brand-success-strong text-white",
  error: "border-brand-error/30 bg-brand-error-strong text-white",
};

function SuccessIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12.5L10 16.5L18 7.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Notification({
  isOpen,
  message,
  onDismiss,
  duration = 4000,
  variant = "success",
}: NotificationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [animationState, setAnimationState] = useState<"enter" | "visible" | "exit">(
    "enter",
  );
  const dismissTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      if (dismissTimerRef.current !== null) {
        window.clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = null;
      }

      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };

    if (!isOpen) {
      clearTimers();
      setIsRendered(false);
      setAnimationState("enter");
      return;
    }

    setIsRendered(true);
    setAnimationState("enter");

    const visibleFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setAnimationState("visible");
      });
    });

    dismissTimerRef.current = window.setTimeout(() => {
      setAnimationState("exit");

      exitTimerRef.current = window.setTimeout(() => {
        setIsRendered(false);
        onDismiss();
      }, EXIT_ANIMATION_MS);
    }, duration);

    return () => {
      window.cancelAnimationFrame(visibleFrame);
      clearTimers();
    };
  }, [duration, isOpen, message, onDismiss]);

  if (!isMounted || !isRendered) {
    return null;
  }

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`notification-toast fixed top-4 right-4 z-[100] flex max-w-[min(calc(100vw-2rem),22rem)] items-center gap-3 rounded-xl border px-4 py-3.5 shadow-lg sm:top-6 sm:right-6 sm:px-5 sm:py-4 ${variantStyles[variant]} notification-toast--${animationState}`}
    >
      {variant === "success" ? <SuccessIcon /> : null}
      <p className="text-sm font-medium leading-snug sm:text-[15px]">{message}</p>
    </div>,
    document.body,
  );
}
