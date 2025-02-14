"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import posthog from "posthog-js";

// Wrap the part that uses useSearchParams in a separate component
function HomeParams() {
  const searchParams = useSearchParams();
  const friendMessage = searchParams.get("invite");
  return <HomeContent friendMessage={friendMessage} />;
}

function HomeContent({ friendMessage }: { friendMessage: string | null }) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const valentinesDay = new Date(now.getFullYear(), 1, 14);
      if (now > valentinesDay) {
        valentinesDay.setFullYear(valentinesDay.getFullYear() + 1);
      }
      const difference = valentinesDay.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (friendMessage) {
      posthog.capture("quiz_started", {
        fromInvite: true,
        timestamp: new Date().toISOString(),
      });
    }
  }, [friendMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <motion.div
        className="absolute top-4 left-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="text-pink-500 h-6 w-6" />
          <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            DateMatch
          </span>
        </Link>
      </motion.div>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-pink-500 font-bold"
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          {friendMessage && (
            <Card className="mb-8 w-full max-w-md bg-white/80 backdrop-blur-sm mx-auto">
              <CardContent className="p-4">
                <p className="font-bold text-pink-600">Your friend says:</p>
                <p className="text-gray-800 mt-2">{friendMessage}</p>
              </CardContent>
            </Card>
          )}

          <motion.h1
            className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6 leading-normal"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.8,
            }}
          >
            Will You Stay Single Forever?
          </motion.h1>

          {/* Enhanced Value Proposition */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
              Get your personalized dating analysis & find your perfect match!
              💘
            </p>
            <p className="text-lg text-gray-600 space-y-2">
              <span className="block">
                Join <span className="text-pink-500 font-bold">250+</span>{" "}
                others who discovered their fate
              </span>
            </p>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/quiz" passHref>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-pink-600 hover:to-purple-700">
                Take the Quiz ✨
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500">Takes only 2 minutes!</p>
          </motion.div>
          <motion.div
            className="mt-12 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-semibold">Valentine&apos;s Day Countdown:</p>
            {timeLeft ? (
              <p className="font-bold text-2xl text-pink-600">{timeLeft}</p>
            ) : (
              <p className="font-bold text-2xl text-pink-600">
                Loading countdown...
              </p>
            )}
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-4 left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Heart className="text-pink-500 h-8 w-8 animate-pulse" />
      </motion.div>

      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Heart className="text-purple-500 h-8 w-8 animate-pulse" />
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      }
    >
      <HomeParams />
    </Suspense>
  );
}
