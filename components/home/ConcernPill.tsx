import Image from "next/image";

type ConcernPillProps = {
  label: string;
  icon: string;
  className?: string;
  widthClassName?: string;
  iconWrapClassName?: string;
};

export default function ConcernPill({
  label,
  icon,
  className = "",
  widthClassName = "w-[9.5rem] sm:w-[10.75rem]",
  iconWrapClassName = "bg-white",
}: ConcernPillProps) {
  return (
    <div
      className={`flex items-center rounded-full border border-white/70 bg-white/45 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur-md sm:py-2 sm:pl-2 sm:pr-4 ${widthClassName} ${className}`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${iconWrapClassName}`}
      >
        <Image src={icon} alt="" width={22} height={22} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
      </span>
      <span className="flex-1 whitespace-nowrap pl-2.5 text-[13px] font-medium tracking-wide text-brand-primary sm:pl-3 sm:text-[15px]">
        {label}
      </span>
    </div>
  );
}
