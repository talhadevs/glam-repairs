import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { stepListSpacingClassName } from "@/components/steps/stepStyles";

type StepChoiceListProps = {
  children: ReactNode;
  spacing?: keyof typeof stepListSpacingClassName;
  className?: string;
};

export default function StepChoiceList({
  children,
  spacing = "default",
  className,
}: StepChoiceListProps) {
  return (
    <div className={cn(stepListSpacingClassName[spacing], className)}>
      {children}
    </div>
  );
}
