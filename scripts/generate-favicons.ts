import sharp from "sharp";
import fs from "fs/promises";

const FAVICON_SIZES = [16, 32, 192, 512];
const APPLE_TOUCH_ICON_SIZE = 180;

async function generateFavicons() {
  // Start with the SVG file instead of PNG
  const source = sharp("public/logo.svg");

  // Generate regular favicons
  for (const size of FAVICON_SIZES) {
    await source
      .clone()
      .resize(size, size)
      .png()
      .toFile(`public/favicon-${size}x${size}.png`);

    // Copy the 32x32 version to favicon.ico
    if (size === 32) {
      await fs.copyFile(
        `public/favicon-${size}x${size}.png`,
        "public/favicon.ico"
      );
    }

    // Generate Android Chrome icons
    if (size === 192 || size === 512) {
      await source
        .clone()
        .resize(size, size)
        .png()
        .toFile(`public/android-chrome-${size}x${size}.png`);
    }
  }

  // Generate Apple Touch Icon
  await source
    .clone()
    .resize(APPLE_TOUCH_ICON_SIZE, APPLE_TOUCH_ICON_SIZE)
    .png()
    .toFile("public/apple-touch-icon.png");
}

generateFavicons().catch(console.error);
