import Image from "next/image";

type PillBadgeProps = {
  icon: string;
  label: string;
  className?: string;
};

export default function PillBadge({ icon, label, className = "" }: PillBadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full bg-brand-cream p-1 pr-5 sm:pr-6 ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
        <Image src={icon} alt="" width={20} height={20} className="h-4 w-auto" />
      </span>
      <span className="pl-2.5 text-xl font-normal tracking-wide text-brand-gray sm:pl-3">
        {label}
      </span>
    </div>
  );
}
