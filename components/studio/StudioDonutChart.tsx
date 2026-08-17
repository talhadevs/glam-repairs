type StudioDonutChartProps = {
  paid: number;
  pending: number;
};

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 78;
const STROKE = 28;
const PAID_COLOR = "#662d91";
const PENDING_COLOR = "#d6cdea";

function circleLength(radius: number) {
  return 2 * Math.PI * radius;
}

export default function StudioDonutChart({ paid, pending }: StudioDonutChartProps) {
  const total = paid + pending;

  if (total === 0) {
    return (
      <p className="py-10 text-center text-sm text-brand-gray">
        No customers to show yet.
      </p>
    );
  }

  const length = circleLength(RADIUS);
  const paidLength = (paid / total) * length;
  const pendingLength = length - paidLength;
  const paidPercent = Math.round((paid / total) * 100);

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
      <div className="relative h-52 w-52 shrink-0">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full -rotate-90"
          role="img"
          aria-label={`${paid} paid and ${pending} pending customers`}
        >
          {paid === total || pending === total ? (
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke={paid === total ? PAID_COLOR : PENDING_COLOR}
              strokeWidth={STROKE}
            />
          ) : (
            <>
              <circle
                cx={CX}
                cy={CY}
                r={RADIUS}
                fill="none"
                stroke={PAID_COLOR}
                strokeWidth={STROKE}
                strokeDasharray={`${paidLength} ${length}`}
                strokeLinecap="butt"
              />
              <circle
                cx={CX}
                cy={CY}
                r={RADIUS}
                fill="none"
                stroke={PENDING_COLOR}
                strokeWidth={STROKE}
                strokeDasharray={`${pendingLength} ${length}`}
                strokeDashoffset={-paidLength}
                strokeLinecap="butt"
              />
            </>
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-serif text-3xl text-brand-primary">{paidPercent}%</p>
          <p className="text-xs text-brand-gray">paid</p>
        </div>
      </div>
      <ul className="space-y-3 text-sm text-brand-gray">
        <li className="flex items-center gap-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: PAID_COLOR }}
          />
          <span>
            Paid{" "}
            <span className="font-medium text-brand-ink">{paid}</span>
          </span>
        </li>
        <li className="flex items-center gap-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: PENDING_COLOR }}
          />
          <span>
            Pending{" "}
            <span className="font-medium text-brand-ink">{pending}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
