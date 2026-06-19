import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "svgs", "image 571.svg");
const svg = fs.readFileSync(svgPath, "utf8");
const match = svg.match(/xlink:href="data:image\/png;base64,([^"]+)"/);

if (!match) {
  throw new Error("PNG not found in SVG");
}

const pngBuffer = Buffer.from(match[1], "base64");
const outDir = path.join(root, "public", "images", "skin-comparison");
fs.mkdirSync(outDir, { recursive: true });

const image = sharp(pngBuffer);
const metadata = await image.metadata();
const halfWidth = Math.floor((metadata.width ?? 900) / 2);
const height = metadata.height ?? 1200;

await sharp(pngBuffer)
  .extract({ left: 0, top: 0, width: halfWidth, height })
  .png()
  .toFile(path.join(outDir, "before.png"));

await sharp(pngBuffer)
  .extract({ left: halfWidth, top: 0, width: halfWidth, height })
  .png()
  .toFile(path.join(outDir, "after.png"));

console.log(`Created before.png and after.png (${halfWidth}x${height})`);
