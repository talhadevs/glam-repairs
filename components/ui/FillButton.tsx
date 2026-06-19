import type { ButtonHTMLAttributes } from "react";

const variantStyles = {
  guidance:
    "guidance-fill-btn rounded-full border border-brand-border-light bg-white font-normal tracking-[0.15em] text-brand-light",
  analysis:
    "analysis-fill-btn cursor-pointer whitespace-nowrap rounded-full bg-white font-normal tracking-[0.15em]",
  subscribe:
    "subscribe-fill-btn rounded-full bg-brand-light font-normal text-white",
  cta:
    "cta-fill-btn rounded-full bg-white/20 font-medium tracking-[0.15em] text-white backdrop-blur-sm",
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
