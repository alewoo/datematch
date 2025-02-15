"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import posthog from "posthog-js";

// Add this new component at the top of the file, after the imports
function FloatingHearts() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0.3,
            scale: 0.5,
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [0.5, 1.0, 0.5],
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            className="text-pink-400/40 dark:text-pink-700/40"
            style={{
              width: `${35 + Math.random() * 35}px`,
              height: `${35 + Math.random() * 35}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              filter: "blur(0.5px)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    posthog.capture("page_viewed", {
      page: "home",
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <FloatingHearts />
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
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-pink-600 hover:to-purple-700 relative overflow-hidden group">
                <span className="relative z-10">Take the Quiz ✨</span>
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-45deg] group-hover:animate-shine" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500">Takes only 2 minutes!</p>
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

      <div className="fixed inset-0 noise" />
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
      <HomeContent />
    </Suspense>
  );
}
