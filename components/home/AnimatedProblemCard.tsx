"use client";

import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";
import ProblemCard, { type ProblemCardProps } from "@/components/home/ProblemCard";

type AnimatedProblemCardProps = ProblemCardProps & {
  direction?: "left" | "right";
  delay?: number;
};

export default function AnimatedProblemCard({
  direction = "left",
  delay = 0,
  className = "",
  ...cardProps
}: AnimatedProblemCardProps) {
  return (
    <AnimatedSlideIn
      direction={direction}
      delay={delay}
      className={className}
    >
      <ProblemCard {...cardProps} />
    </AnimatedSlideIn>
  );
}
