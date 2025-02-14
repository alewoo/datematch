import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My DateMatch Results",
  description: "Check out my personality match results on DateMatch!",
  openGraph: {
    title: "My DateMatch Results",
    description: "Check out my personality match results on DateMatch!",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "DateMatch Results Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My DateMatch Results",
    description: "Check out my personality match results on DateMatch!",
    images: ["/api/og"],
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
