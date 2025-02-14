import { ImageResponse } from "next/og";
import { Inter } from "next/font/google";

export const runtime = "edge";

// Initialize Inter font with bold weight
const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export async function GET() {
  try {
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
            fontFamily: inter.style.fontFamily,
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
                <circle cx="256" cy="256" r="256" fill="#ffffff" />
                <path d="M256 128L384 384H128L256 128Z" fill="#ec4899" />
              </svg>
            </div>
            <div
              style={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: "64px",
                fontWeight: "700",
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
