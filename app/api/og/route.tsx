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
            backgroundColor: "white",
            background:
              "linear-gradient(to bottom right, #fce7f3, #ffe4e6, #f3e8ff)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {/* Heart emoji */}
            <span style={{ fontSize: 100, marginRight: 20 }}>💝</span>
            <div
              style={{
                fontSize: 60,
                fontWeight: "bold",
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              DateMatch
            </div>
          </div>
          <div
            style={{
              fontSize: 40,
              textAlign: "center",
              maxWidth: "80%",
              color: "#4b5563",
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
