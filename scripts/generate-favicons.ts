import sharp from "sharp";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

const FAVICON_SIZES = [16, 32, 192, 512];
const APPLE_TOUCH_ICON_SIZE = 180;

async function generateFavicons() {
  const source = sharp(join(projectRoot, "public/logo.svg"));

  // Generate regular favicons
  for (const size of FAVICON_SIZES) {
    await source
      .clone()
      .resize(size, size)
      .png()
      .toFile(join(projectRoot, `public/favicon-${size}x${size}.png`));

    // Copy the 32x32 version to favicon.ico
    if (size === 32) {
      await fs.copyFile(
        join(projectRoot, `public/favicon-${size}x${size}.png`),
        join(projectRoot, "public/favicon.ico")
      );
    }

    // Generate Android Chrome icons
    if (size === 192 || size === 512) {
      await source
        .clone()
        .resize(size, size)
        .png()
        .toFile(join(projectRoot, `public/android-chrome-${size}x${size}.png`));
    }
  }

  // Generate Apple Touch Icon
  await source
    .clone()
    .resize(APPLE_TOUCH_ICON_SIZE, APPLE_TOUCH_ICON_SIZE)
    .png()
    .toFile(join(projectRoot, "public/apple-touch-icon.png"));
}

generateFavicons().catch(console.error);
