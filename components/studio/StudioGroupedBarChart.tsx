export type StudioBarSeries = {
  key: string;
  label: string;
  color: string;
};

export type StudioBarGroup = {
  id?: string;
  label: string;
  values: Record<string, number>;
};

type StudioGroupedBarChartProps = {
  series: StudioBarSeries[];
  groups: StudioBarGroup[];
  ariaLabel: string;
  emptyMessage: string;
};

const VIEW_WIDTH = 560;
const VIEW_HEIGHT = 240;
const PAD_LEFT = 36;
const PAD_RIGHT = 16;
const PAD_TOP = 18;
const PAD_BOTTOM = 42;

function niceMax(value: number) {
  if (value <= 0) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const n = value / magnitude;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return nice * magnitude;
}

function truncateLabel(label: string) {
  return label.length > 14 ? `${label.slice(0, 13)}…` : label;
}

export default function StudioGroupedBarChart({
  series,
  groups,
  ariaLabel,
  emptyMessage,
}: StudioGroupedBarChartProps) {
  const hasValues = groups.some((group) =>
    series.some((item) => (group.values[item.key] ?? 0) > 0),
  );

  if (!hasValues) {
    return (
      <p className="py-10 text-center text-sm text-brand-gray">{emptyMessage}</p>
    );
  }

  const rawMax = Math.max(
    ...groups.flatMap((group) =>
      series.map((item) => group.values[item.key] ?? 0),
    ),
    0,
  );
  const max = niceMax(rawMax);
  const plotWidth = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
  const groupWidth = plotWidth / groups.length;
  const barWidth = Math.min(22, Math.max(8, (groupWidth - 20) / series.length));
  const clusterWidth = barWidth * series.length;
  const ticks = [0, max / 2, max];

  return (
    <div className="w-full">
      <div className="aspect-[560/240] w-full">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="h-full w-full"
          role="img"
          aria-label={ariaLabel}
        >
          {ticks.map((tick) => {
            const y = PAD_TOP + plotHeight - (tick / max) * plotHeight;
            return (
              <g key={tick}>
                <line
                  x1={PAD_LEFT}
                  x2={VIEW_WIDTH - PAD_RIGHT}
                  y1={y}
                  y2={y}
                  stroke="#E8E8E8"
                  strokeWidth="1"
                />
                <text
                  x={PAD_LEFT - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-brand-gray text-[10px]"
                >
                  {Number.isInteger(tick) ? tick : tick.toFixed(1)}
                </text>
              </g>
            );
          })}

          {groups.map((group, groupIndex) => {
            const groupX = PAD_LEFT + groupIndex * groupWidth;
            const clusterX = groupX + (groupWidth - clusterWidth) / 2;

            return (
              <g key={group.id ?? group.label}>
                {series.map((item, seriesIndex) => {
                  const value = group.values[item.key] ?? 0;
                  const height = (value / max) * plotHeight;
                  const x = clusterX + seriesIndex * barWidth;
                  const y = PAD_TOP + plotHeight - height;
                  return (
                    <g key={item.key}>
                      <rect
                        x={x + 1}
                        y={y}
                        width={barWidth - 2}
                        height={Math.max(height, value > 0 ? 2 : 0)}
                        rx="4"
                        fill={item.color}
                      />
                      {value > 0 ? (
                        <text
                          x={x + barWidth / 2}
                          y={y - 6}
                          textAnchor="middle"
                          className="fill-brand-ink text-[10px] font-medium"
                        >
                          {value}
                        </text>
                      ) : null}
                    </g>
                  );
                })}
                <text
                  x={groupX + groupWidth / 2}
                  y={VIEW_HEIGHT - 14}
                  textAnchor="middle"
                  className="fill-brand-ink text-[11px]"
                >
                  {truncateLabel(group.label)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-gray">
        {series.map((item) => (
          <li key={item.key} className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
