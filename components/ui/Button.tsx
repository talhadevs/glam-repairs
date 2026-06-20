import type { ButtonHTMLAttributes, ReactNode } from "react";

const variantStyles = {
  accent:
    "cursor-pointer rounded-full bg-brand-accent px-4 py-2 text-[10px] font-medium tracking-[0.15em] text-white disabled:cursor-not-allowed sm:px-6 sm:py-2.5 sm:text-xs lg:whitespace-nowrap",
  primary:
    "inline-flex cursor-pointer items-center rounded-full bg-brand-primary p-1 pr-5 disabled:cursor-not-allowed sm:pr-6 lg:whitespace-nowrap",
  cta:
    "cta-fill-btn cursor-pointer rounded-full bg-white/20 px-8 py-3.5 text-sm font-medium tracking-[0.15em] text-white backdrop-blur-sm disabled:cursor-not-allowed sm:px-10 sm:py-4 sm:text-base lg:whitespace-nowrap",
} as const;

type ButtonVariant = keyof typeof variantStyles;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  className?: string;
};

export default function Button({
  variant = "accent",
  icon,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `${variantStyles[variant]} ${className}`.trim();

  if (variant === "primary" && icon) {
    return (
      <button type={type} className={classes} {...props}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
          {icon}
        </span>
        <span className="pl-2.5 text-xl font-normal tracking-wide text-white sm:pl-3 lg:whitespace-nowrap">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
