import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  stepEyebrowClassName,
  stepSubtitleClassName,
  stepTitleClassName,
} from "@/components/steps/stepStyles";

type StepHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  titleSize?: keyof typeof stepTitleClassName;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
};

export default function StepHeader({
  title,
  subtitle,
  eyebrow,
  titleSize = "lg",
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
  className,
}: StepHeaderProps) {
  const isStatement = titleSize === "statement";

  return (
    <header className={className}>
      {eyebrow ? (
        <p
          className={cn(
            isStatement
              ? "text-sm text-brand-gray sm:text-[0.9375rem]"
              : stepEyebrowClassName,
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          stepTitleClassName[titleSize],
          eyebrow && !isStatement ? "mt-3" : null,
          isStatement ? "mt-3" : null,
          titleClassName,
        )}
      >
        {title}
      </h1>
      {subtitle ? (
        <p className={cn(stepSubtitleClassName, subtitleClassName)}>{subtitle}</p>
      ) : null}
    </header>
  );
}
