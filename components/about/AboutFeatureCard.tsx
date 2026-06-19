import Image from "next/image";

type AboutFeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  className?: string;
};

export default function AboutFeatureCard({
  title,
  description,
  icon,
  className = "",
}: AboutFeatureCardProps) {
  return (
    <article
      className={`flex items-center gap-3 rounded-2xl border border-brand-lavender bg-white px-4 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:gap-3.5 sm:px-5 sm:py-4 ${className}`}
    >
      <Image
        src={icon}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
      />
      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-snug text-black sm:text-base">
          {title}
        </h3>
        <p className="mt-0.5 text-xs leading-snug text-brand-gray sm:mt-1 sm:text-sm">
          {description}
        </p>
      </div>
    </article>
  );
}
