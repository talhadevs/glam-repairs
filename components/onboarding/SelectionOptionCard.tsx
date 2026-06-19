import Image from "next/image";
import type { ReactNode } from "react";

const baseClassName =
  "flex w-full items-center rounded-2xl border px-4 py-3.5 text-left shadow-sm transition-colors sm:px-5 sm:py-4";

const selectedClassName =
  "border-brand-light bg-brand-light text-white";

const unselectedClassName =
  "border-brand-border-light/60 bg-white text-brand-ink hover:border-brand-lavender";

type SelectionOptionCardProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon?: string;
  iconClassName?: string;
  children?: ReactNode;
  className?: string;
};

export default function SelectionOptionCard({
  label,
  selected,
  onSelect,
  icon,
  iconClassName = "h-8 w-8 sm:h-9 sm:w-9",
  children,
  className = "",
}: SelectionOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${baseClassName} ${selected ? selectedClassName : unselectedClassName} ${icon ? "gap-4 sm:gap-5" : ""} ${className}`.trim()}
    >
      {icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
          <Image
            src={icon}
            alt=""
            width={36}
            height={36}
            className={`${iconClassName} ${selected ? "brightness-0 invert" : ""}`.trim()}
          />
        </span>
      ) : null}
      {children ?? (
        <span className="text-base sm:text-[1.05rem]">{label}</span>
      )}
    </button>
  );
}

export { selectedClassName, unselectedClassName };
