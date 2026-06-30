import Image from "next/image";

const worldMap = "/images,svgs/world-map-purple.png";

// Dot positions as percentages of the map image (405 x 270), taken from the Figma design.
const mapDots = [
  { x: 10.0, y: 33.9, delay: 0.0 },
  { x: 16.4, y: 32.0, delay: 0.35 },
  { x: 14.7, y: 39.8, delay: 0.7 },
  { x: 18.4, y: 44.6, delay: 1.05 },
  { x: 19.6, y: 39.8, delay: 0.2 },
  { x: 15.9, y: 35.7, delay: 0.55 },
  { x: 17.2, y: 39.8, delay: 0.9 },
  { x: 20.4, y: 36.9, delay: 0.15 },
  { x: 24.1, y: 35.0, delay: 0.5 },
  { x: 22.9, y: 42.8, delay: 0.85 },
  { x: 30.8, y: 44.6, delay: 1.2 },
  { x: 18.4, y: 51.7, delay: 0.3 },
  { x: 27.4, y: 53.5, delay: 0.65 },
  { x: 24.1, y: 49.8, delay: 1.0 },
  { x: 53.9, y: 46.5, delay: 0.25 },
  { x: 57.8, y: 39.1, delay: 0.6 },
  { x: 56.1, y: 32.0, delay: 0.95 },
  { x: 58.3, y: 49.8, delay: 0.1 },
  { x: 60.0, y: 56.5, delay: 0.45 },
  { x: 65.2, y: 54.6, delay: 0.8 },
  { x: 63.2, y: 48.7, delay: 1.15 },
  { x: 69.7, y: 50.6, delay: 0.2 },
  { x: 70.4, y: 42.8, delay: 0.55 },
  { x: 74.9, y: 35.7, delay: 0.9 },
  { x: 71.1, y: 30.2, delay: 0.05 },
  { x: 75.4, y: 25.0, delay: 0.4 },
  { x: 69.9, y: 35.0, delay: 0.75 },
  { x: 67.2, y: 45.4, delay: 1.1 },
  { x: 77.9, y: 55.7, delay: 0.3 },
  { x: 83.6, y: 46.1, delay: 0.65 },
  { x: 82.8, y: 36.9, delay: 1.0 },
  { x: 87.3, y: 33.1, delay: 0.25 },
  { x: 81.6, y: 31.3, delay: 0.6 },
  { x: 76.4, y: 30.2, delay: 0.95 },
  { x: 80.4, y: 40.2, delay: 0.15 },
  { x: 75.7, y: 42.8, delay: 0.5 },
  { x: 79.1, y: 47.2, delay: 0.85 },
  { x: 72.4, y: 50.9, delay: 1.2 },
  { x: 76.7, y: 51.7, delay: 0.35 },
  { x: 70.6, y: 57.6, delay: 0.7 },
  { x: 91.2, y: 36.1, delay: 0.45 },
  { x: 94.7, y: 31.3, delay: 0.8 },
  { x: 63.2, y: 41.7, delay: 0.1 },
  { x: 64.7, y: 35.0, delay: 0.55 },
  { x: 60.8, y: 39.8, delay: 0.9 },
  { x: 57.6, y: 44.6, delay: 0.25 },
] as const;

export default function MapWithAnimatedDots() {
  return (
    <div className="relative mx-auto aspect-[405/270] w-full max-w-[25.3125rem]">
      <Image
        src={worldMap}
        alt="World map showing Glam community members"
        fill
        sizes="(max-width: 640px) 90vw, 405px"
        className="object-contain"
        priority
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {mapDots.map((dot, index) => (
          <span
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
          >
            <span
              className="map-dot block h-[5px] w-[5px] rounded-full bg-[#f0e0a8] shadow-[0_0_4px_rgba(240,224,168,0.9)]"
              style={{ animationDelay: `${dot.delay}s` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
