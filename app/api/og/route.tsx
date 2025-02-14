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
              padding: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                }}
              >
                <span style={{ fontSize: 40 }}>💝</span>
              </div>
              <span
                style={{
                  fontSize: 56,
                  fontWeight: "bold",
                  color: "#ec4899",
                }}
              >
                DateMatch
              </span>
            </div>

            <div
              style={{
                fontSize: 48,
                textAlign: "center",
                maxWidth: "90%",
                color: "#4b5563",
                marginTop: "32px",
                fontWeight: "bold",
              }}
            >
              Will You Stay Single Forever?
            </div>

            <div
              style={{
                fontSize: 32,
                color: "#6b7280",
                textAlign: "center",
                marginTop: "16px",
                maxWidth: "80%",
              }}
            >
              Find your perfect match through personality-driven university
              dating ✨ Find your perfect match through personality-driven
              university dating ✨
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
