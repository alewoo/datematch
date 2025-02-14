import { ImageResponse } from "next/og";

export const runtime = "edge";

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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                }}
              >
                <span style={{ fontSize: 32 }}>💝</span>
              </div>
              <span
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                DateMatch
              </span>
            </div>

            <div
              style={{
                fontSize: 32,
                textAlign: "center",
                maxWidth: "80%",
                color: "#4b5563",
                marginTop: "20px",
              }}
            >
              Will You Stay Single Forever?
            </div>

            <div
              style={{
                fontSize: 24,
                color: "#6b7280",
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              Find your perfect match through personality-driven university
              dating ✨
            </div>
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
