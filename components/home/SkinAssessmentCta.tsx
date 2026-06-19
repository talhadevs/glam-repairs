"use client";

import type { ButtonHTMLAttributes } from "react";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import Button from "@/components/ui/Button";

const guidanceSizeStyles = {
  sm: "px-10 py-3.5 text-sm sm:px-12 sm:py-4 sm:text-base",
  md: "px-10 py-3.5 text-[1.05rem] sm:px-12 sm:py-4 sm:text-[1.2rem]",
  lg: "px-12 py-4 text-base sm:px-16 sm:py-5 sm:text-lg",
} as const;

type GuidanceSize = keyof typeof guidanceSizeStyles;
type SkinAssessmentCtaVariant = "guidance" | "analysis" | "hero";

type SkinAssessmentCtaProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: SkinAssessmentCtaVariant;
  label?: string;
  size?: GuidanceSize;
  className?: string;
};

export default function SkinAssessmentCta({
  variant = "guidance",
  label = "GET MY SKIN ASSESSMENT",
  size = "sm",
  className = "",
  type = "button",
  ...props
}: SkinAssessmentCtaProps) {
  if (variant === "hero") {
    return (
      <AnimatedSlideIn
        direction="up"
        className={`mt-8 w-full max-w-sm sm:mt-10 sm:w-auto sm:max-w-none ${className}`.trim()}
      >
        <Button variant="cta" className="w-full sm:w-auto" type={type} {...props}>
          {label}
        </Button>
      </AnimatedSlideIn>
    );
  }

  if (variant === "analysis") {
    return (
      <button
        type={type}
        className={`analysis-fill-btn cursor-pointer whitespace-nowrap rounded-full bg-white px-6 py-3 text-xs font-normal tracking-[0.15em] sm:px-8 sm:py-3.5 sm:text-sm ${className}`.trim()}
        {...props}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`guidance-fill-btn rounded-full border border-brand-border-light bg-white font-normal tracking-[0.15em] text-brand-light ${guidanceSizeStyles[size]} ${className}`.trim()}
      {...props}
    >
      {label}
    </button>
  );
}
