import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const svg = readFileSync(resolve(root, "public/icon.svg"));

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon.ico", size: 32 },
];

for (const { name, size } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(resolve(root, "public", name));
  console.log(`Generated public/${name} (${size}x${size})`);
}

// Maskable icon (with safe-zone padding for Android adaptive icons)
const maskableSize = 512;
const padding = Math.round(maskableSize * 0.1);
const inner = maskableSize - padding * 2;
await sharp(svg)
  .resize(inner, inner)
  .extend({
    top: padding,
    bottom: padding,
    left: padding,
    right: padding,
    background: { r: 11, g: 17, b: 32, alpha: 1 },
  })
  .png()
  .toFile(resolve(root, "public", "icon-maskable-512.png"));
console.log(`Generated public/icon-maskable-512.png (${maskableSize}x${maskableSize})`);
