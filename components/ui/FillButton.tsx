import type { ButtonHTMLAttributes } from "react";

const variantStyles = {
  guidance:
    "guidance-fill-btn cursor-pointer rounded-full border border-brand-border-light bg-white font-normal tracking-[0.15em] text-brand-light disabled:cursor-not-allowed",
  analysis:
    "analysis-fill-btn cursor-pointer whitespace-nowrap rounded-full bg-white font-normal tracking-[0.15em] disabled:cursor-not-allowed",
  subscribe:
    "subscribe-fill-btn cursor-pointer rounded-full bg-brand-light font-normal text-white disabled:cursor-not-allowed",
  cta:
    "cta-fill-btn cursor-pointer rounded-full bg-white/20 font-medium tracking-[0.15em] text-white backdrop-blur-sm disabled:cursor-not-allowed",
} as const;

type FillButtonVariant = keyof typeof variantStyles;

type FillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: FillButtonVariant;
  className?: string;
};

export default function FillButton({
  variant = "subscribe",
  className = "",
  children,
  type = "button",
  ...props
}: FillButtonProps) {
  return (
    <button
      type={type}
      className={`${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
