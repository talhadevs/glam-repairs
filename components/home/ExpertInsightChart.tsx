const BAR_WIDTH = 55;
const BAR_GAP = 8;
const BAR_BASELINE = 132;
const BAR_MAX_HEIGHT = 124;
const VIEWBOX_TOP = -34;

const GRAPH_OFFSET_X = 18;

const barHeights = [44, 58, 100, 72, 38];

const barXs = barHeights.map(
  (_, index) => 14 + GRAPH_OFFSET_X + index * (BAR_WIDTH + BAR_GAP),
);

function barTopY(height: number) {
  return BAR_BASELINE - (height / 100) * BAR_MAX_HEIGHT;
}

const LINE_OFFSET_X = 5;
const LINE_OFFSET_Y = -2;

const BAR_RX = 6;

function buildLinePath() {
  const tops = barHeights.map((height, index) => ({
    x: barXs[index] + BAR_WIDTH + LINE_OFFSET_X,
    y: barTopY(height) + LINE_OFFSET_Y,
  }));

  const startX = barXs[0] - 10 + LINE_OFFSET_X;
  const radius = BAR_RX;
  let path = `M ${startX} ${tops[0].y} H ${tops[0].x - radius}`;

  for (let index = 0; index < tops.length - 1; index += 1) {
    const { x, y } = tops[index];
    const { y: nextY, x: nextX } = tops[index + 1];
    const steppingDown = nextY > y;

    if (steppingDown) {
      path += ` Q ${x} ${y} ${x} ${y + radius}`;
      path += ` V ${nextY - radius}`;
      path += ` Q ${x} ${nextY} ${x + radius} ${nextY}`;
    } else {
      path += ` Q ${x} ${y} ${x} ${y - radius}`;
      path += ` V ${nextY + radius}`;
      path += ` Q ${x} ${nextY} ${x + radius} ${nextY}`;
    }

    if (index === tops.length - 2) {
      path += ` H ${nextX + 10}`;
    } else {
      path += ` H ${nextX - radius}`;
    }
  }

  return path;
}

const linePath = buildLinePath();

const avatarCx = barXs[2] + BAR_WIDTH / 2;
const avatarCy = barTopY(100) - 22;
const avatarR = 19;

export default function ExpertInsightChart() {
  return (
    <svg
      aria-hidden
      className="h-full w-full"
      preserveAspectRatio="xMaxYMax meet"
      viewBox={`0 ${VIEWBOX_TOP} 340 ${136 - VIEWBOX_TOP}`}
    >
      <defs>
        <linearGradient id="expertBarWhite" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
          <stop offset="52%" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="expertBarSkin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-cream)" stopOpacity="1" />
          <stop offset="52%" stopColor="var(--brand-cream)" stopOpacity="0.72" />
          <stop offset="100%" stopColor="var(--brand-cream)" stopOpacity="0" />
        </linearGradient>
        <clipPath id="expertAvatarClip">
          <circle cx={avatarCx} cy={avatarCy} r={avatarR} />
        </clipPath>
      </defs>

      {barHeights.map((height, index) => {
        const x = barXs[index];
        const y = barTopY(height);
        const barHeight = BAR_BASELINE - y;

        return (
          <rect
            key={index}
            fill={index === 2 ? "url(#expertBarSkin)" : "url(#expertBarWhite)"}
            height={barHeight}
            rx={BAR_RX}
            width={BAR_WIDTH}
            x={x}
            y={y}
          />
        );
      })}

      <path
        d={linePath}
        fill="none"
        stroke="#ffffff"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />

      <image
        clipPath="url(#expertAvatarClip)"
        height={avatarR * 2}
        href="/svgs/Group 2085660775.svg"
        preserveAspectRatio="xMidYMid slice"
        width={avatarR * 2}
        x={avatarCx - avatarR}
        y={avatarCy - avatarR}
      />
    </svg>
  );
}
