import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DateMatch",
  description:
    "Find your perfect match through personality-driven university dating, powered by in-depth personality analysis",
  metadataBase: new URL("https://datematch.lol"),
  openGraph: {
    title: "DateMatch",
    description:
      "Find your perfect match through personality-driven university dating, powered by in-depth personality analysis",
    url: "https://datematch.lol",
    siteName: "DateMatch",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "DateMatch Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DateMatch",
    description:
      "Find your perfect match through personality-driven university dating, powered by in-depth personality analysis",
    images: ["/api/og"],
    creator: "@imalexwang",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
