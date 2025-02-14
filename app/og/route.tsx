import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
          background: "linear-gradient(to bottom right, #fce7f3, #ede9fe)",
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
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="512" height="512" rx="128" fill="url(#gradient)" />
              <path
                d="M372.8 192.5c0 66.5-68.8 120.4-116.8 159.2-48-38.8-116.8-92.7-116.8-159.2 0-41.3 33.5-74.8 74.8-74.8 29.4 0 54.8 17 67 41.6 12.2-24.6 37.6-41.6 67-41.6 41.3 0 74.8 33.5 74.8 74.8z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="512"
                  y2="512"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <span
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              DateMatch
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#ec4899",
              margin: "0",
              lineHeight: "1.1",
            }}
          >
            Will You Stay
            <br />
            Single Forever?
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "32px",
              color: "#4b5563",
              textAlign: "center",
              margin: "0",
              maxWidth: "80%",
            }}
          >
            Take this 2-minute quiz to discover your dating personality! 💘
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
