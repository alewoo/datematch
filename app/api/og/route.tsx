import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    const interRegular = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
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
                <path
                  fill="#ffffff"
                  d="M372.8 192.5c0 66.5-68.8 120.4-116.8 159.2-48-38.8-116.8-92.7-116.8-159.2 0-41.3 33.5-74.8 74.8-74.8 29.4 0 54.8 17 67 41.6 12.2-24.6 37.6-41.6 67-41.6 41.3 0 74.8 33.5 74.8 74.8z"
                />
              </svg>
            </div>
            <div
              style={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: "64px",
                fontWeight: "bold",
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
