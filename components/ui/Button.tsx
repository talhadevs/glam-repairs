import type { ButtonHTMLAttributes, ReactNode } from "react";

const variantStyles = {
  accent:
    "rounded-full bg-brand-accent px-4 py-2 text-[10px] font-medium tracking-[0.15em] text-white sm:px-6 sm:py-2.5 sm:text-xs",
  primary:
    "inline-flex items-center rounded-full bg-brand-primary p-1 pr-5 sm:pr-6",
  cta:
    "cta-fill-btn rounded-full bg-white/20 px-8 py-3.5 text-sm font-medium tracking-[0.15em] text-white backdrop-blur-sm sm:px-10 sm:py-4 sm:text-base",
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
        <span className="pl-2.5 text-xl font-normal tracking-wide text-white sm:pl-3">
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
