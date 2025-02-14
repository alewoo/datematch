import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "DateMatch";

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
            background: "linear-gradient(to bottom right, #fce7f3, #ede9fe)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              fontWeight: 700,
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 20,
            }}
          >
            DateMatch
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "#4b5563",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
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
