import {
  comparisonPrices,
  comparisonRows,
  comparisonTabLabels,
  comparisonTitle,
  type ComparisonCell,
} from "@/components/pricing/featureComparison";

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 12"
      className="mx-auto h-3 w-4 text-brand-success"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.2L5.4 10.6L15 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ComparisonCellContent({ cell }: { cell: ComparisonCell }) {
  if (cell.type === "check") {
    return <CheckIcon />;
  }

  if (cell.type === "dash") {
    return (
      <span aria-hidden className="text-sm font-light text-brand-gray/70">
        —
      </span>
    );
  }

  return (
    <span className="px-1 text-center text-xs font-medium leading-snug text-black sm:text-sm">
      {cell.value}
    </span>
  );
}

function getTabColumnRadius(index: number, total: number) {
  if (index === 0) {
    return "rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-full";
  }

  if (index === total - 1) {
    return "rounded-tr-full rounded-br-full rounded-bl-full";
  }

  return "rounded-tr-full rounded-bl-full rounded-br-full";
}

export default function FeaturesComparisonSection() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24 xl:px-12">
      <div className="mx-auto max-w-[86rem]">
        <h2 className="text-center font-serif text-[2rem] tracking-normal text-[#662D91] sm:text-[2.75rem] lg:text-[3.25rem]">
          {comparisonTitle}
        </h2>

        <div className="mt-8 overflow-x-auto sm:mt-10">
          <div className="min-w-[48rem]">
            <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] overflow-hidden">
              {comparisonTabLabels.map((label, index) => (
                <div
                  key={label}
                  className={`bg-[#A88EC3] px-4 py-3.5 text-center text-sm font-medium text-white sm:px-5 sm:py-4 sm:text-base ${getTabColumnRadius(index, comparisonTabLabels.length)} ${
                    index < comparisonTabLabels.length - 1
                      ? "border-r border-white/25"
                      : ""
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-[20px] border border-brand-border-light">
            <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b border-brand-border-light bg-white">
              <div className="border-r border-brand-border-light px-5 py-3 text-sm font-semibold text-black sm:px-6 sm:py-4 sm:text-base">
                Price
              </div>
              {comparisonPrices.map((price, index) => (
                <div
                  key={price}
                  className={`px-3 py-3 text-center text-xs font-semibold text-black sm:px-4 sm:py-4 sm:text-sm ${
                    index < comparisonPrices.length - 1
                      ? "border-r border-brand-border-light"
                      : ""
                  }`}
                >
                  {price}
                </div>
              ))}
            </div>

            {comparisonRows.map((row, rowIndex) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1.4fr_repeat(3,1fr)] bg-white ${
                  rowIndex < comparisonRows.length - 1
                    ? "border-b border-brand-border-light"
                    : ""
                }`}
              >
                <div className="border-r border-brand-border-light px-5 py-3.5 text-sm text-black sm:px-6 sm:py-4 sm:text-[15px]">
                  {row.feature}
                </div>
                {row.values.map((cell, planIndex) => (
                  <div
                    key={`${row.feature}-${planIndex}`}
                    className={`flex items-center justify-center px-3 py-3.5 sm:px-4 sm:py-4 ${
                      planIndex < row.values.length - 1
                        ? "border-r border-brand-border-light"
                        : ""
                    }`}
                  >
                    <ComparisonCellContent cell={cell} />
                  </div>
                ))}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
