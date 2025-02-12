"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const friendMessage = searchParams.get("invite");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 flex flex-col items-center justify-center p-4">
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
          {/* Enhanced Subtext */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
              Only 5% of quiz takers are actually dateable. Are you one of them?
            </p>
            <p className="text-lg text-gray-600">
              Join <span className="text-pink-500 font-bold">96+</span> others
              who discovered their fate
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
                Take the Quiz
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
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
