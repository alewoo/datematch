import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    // Load the font files
    const interRegular = await fetch(
      new URL(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
      )
    ).then((res) => res.arrayBuffer());

    const interBold = await fetch(
      new URL(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2"
      )
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(to bottom right, #fce7f3, #fee2e2, #f3e8ff)",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="512" height="512" fill="url(#gradient)" rx="128" />
                <path
                  fill="#fff"
                  d="M372.8 192.5c0 66.5-68.8 120.4-116.8 159.2-48-38.8-116.8-92.7-116.8-159.2 0-41.3 33.5-74.8 74.8-74.8 29.4 0 54.8 17 67 41.6 12.2-24.6 37.6-41.6 67-41.6 41.3 0 74.8 33.5 74.8 74.8z"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0"
                    x2="512"
                    y1="0"
                    y2="512"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" style={{ stopColor: "#ec4899" }} />
                    <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div
              style={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: "64px",
                fontWeight: 700,
              }}
            >
              DateMatch
            </div>
          </div>

          <div
            style={{
              fontSize: "36px",
              textAlign: "center",
              color: "#4b5563",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Find your perfect match through personality-driven university dating
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: interBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
