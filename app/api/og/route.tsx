import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "DateMatch";
    const description =
      searchParams.get("description") ||
      "Find your perfect match through personality-driven university dating, powered by in-depth personality analysis";

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
            background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)",
            padding: "40px",
            position: "relative",
          }}
        >
          {/* Background Hearts */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.1,
                fontSize: `${50 + Math.random() * 50}px`,
                color: "#ec4899",
              }}
            >
              ❤️
            </div>
          ))}

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 32,
              fontFamily: "Inter",
              textAlign: "center",
              lineHeight: 1.1,
              padding: "0 20px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#4b5563",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
              fontFamily: "Inter",
              padding: "0 20px",
            }}
          >
            {description}
          </div>

          {/* Bottom Accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await fetch(
              new URL(
                "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYAZ9hiA.woff2",
                "https://fonts.gstatic.com"
              )
            ).then((res) => res.arrayBuffer()),
            weight: 800,
            style: "normal",
          },
          {
            name: "Inter",
            data: await fetch(
              new URL(
                "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2",
                "https://fonts.gstatic.com"
              )
            ).then((res) => res.arrayBuffer()),
            weight: 500,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    const error = e as Error;
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
