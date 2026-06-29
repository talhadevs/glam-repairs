import Image from "next/image";

export type ProblemCardProps = {
  icon: string;
  title: string;
  description: string;
  variant: "purple" | "cream";
  className?: string;
};

export default function ProblemCard({
  icon,
  title,
  description,
  variant,
  className = "",
}: ProblemCardProps) {
  return (
    <article
      className={`flex flex-col items-center rounded-2xl px-5 py-4 pt-8 text-center shadow-sm sm:px-6 sm:py-5 ${
        variant === "purple" ? "bg-brand-purple-soft" : "bg-brand-cream"
      } ${className}`}
    >
      <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
        <Image src={icon} alt="" width={32} height={32} className="h-7 w-auto max-h-8" />
      </div>
      <h3 className="font-serif italic leading-tight text-brand-primary text-xl sm:text-2xl">
        {title}
      </h3>
      <p className="mt-2 font-sans leading-normal tracking-[-0.01em] text-brand-ink text-[0.95rem] sm:text-base">
        {description}
      </p>
    </article>
  );
}
