import sharp from "sharp";

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

    if (size === 192) {
      await source
        .clone()
        .resize(size, size)
        .png()
        .toFile("public/android-chrome-192x192.png");
    }

    if (size === 512) {
      await source
        .clone()
        .resize(size, size)
        .png()
        .toFile("public/android-chrome-512x512.png");
    }
  }

  // Generate Apple Touch Icon
  await source
    .clone()
    .resize(APPLE_TOUCH_ICON_SIZE, APPLE_TOUCH_ICON_SIZE)
    .png()
    .toFile("public/apple-touch-icon.png");

  // Generate favicon.ico
  await source.clone().resize(32, 32).png().toFile("public/favicon.ico");
}

generateFavicons().catch(console.error);
