"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Share2, Heart, Ghost, Download } from "lucide-react";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PremiumFeatures } from "../components/premium-features";
import { Suspense } from "react";

interface ResultCategory {
  range: [number, number];
  title: string;
  message: string;
  icon: JSX.Element;
  color: string;
}

const resultCategories: ResultCategory[] = [
  {
    range: [80, 100],
    title: "LOVE MAGNET",
    message: "You're a natural at relationships. Cupid's got nothing on you!",
    icon: <Heart className="w-12 h-12" />,
    color: "bg-red-500",
  },
  {
    range: [60, 79],
    title: "READY TO MINGLE",
    message:
      "You're putting yourself out there. Love might be just around the corner!",
    icon: <Heart className="w-12 h-12" />,
    color: "bg-pink-500",
  },
  {
    range: [40, 59],
    title: "SINGLE... FOR NOW",
    message: "You're open to love, but not in a rush. Keep doing you!",
    icon: <Ghost className="w-12 h-12" />,
    color: "bg-purple-400",
  },
  {
    range: [0, 39],
    title: "SINGLE FOREVER",
    message:
      "You're embracing the single life like a pro! Your independence game is strong.",
    icon: <Ghost className="w-12 h-12" />,
    color: "bg-purple-600",
  },
];

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = Number.parseInt(searchParams.get("score") || "0");
  const [customMessage, setCustomMessage] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const resultCardRef = useRef<HTMLDivElement>(null);

  const getResultCategory = (score: number) => {
    return (
      resultCategories.find(
        (category) => score >= category.range[0] && score <= category.range[1]
      ) || resultCategories[0]
    );
  };

  const result = getResultCategory(score);

  const generateInviteLink = () => {
    const baseUrl = window.location.origin;
    const encodedMessage = encodeURIComponent(customMessage);
    const link = `${baseUrl}?invite=${encodedMessage}`;
    setInviteLink(link);
  };

  const shareResult = async () => {
    const shareText = `I scored ${score}% on the "Will You Stay Single Forever?" quiz and got "${result.title}"! Take it yourself:`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Single Score",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("Copied to clipboard!");
    }
  };

  const downloadResultCard = async () => {
    if (resultCardRef.current) {
      const dataUrl = await toPng(resultCardRef.current, { quality: 0.95 });
      const link = document.createElement("a");
      link.download = "my-single-score.png";
      link.href = dataUrl;
      link.click();
    }
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    launchConfetti();
  }, []); // Removed launchConfetti from the dependency array

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div
          ref={resultCardRef}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Score Header */}
          <div className={`${result.color} p-8 text-white text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-4"
            >
              {result.icon}
            </motion.div>
            <h2 className="text-6xl font-bold mb-2">{score}%</h2>
            <h3 className="text-3xl font-bold mb-4">{result.title}</h3>
          </div>

          {/* Result Content */}
          <div className="p-8">
            <p className="text-xl text-center mb-6 text-gray-700">
              {result.message}
            </p>

            <div className="flex justify-center space-x-4">
              <Button onClick={shareResult}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={downloadResultCard}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Custom Invite Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={launchConfetti}
                >
                  Challenge a Friend
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Challenge Your Most Single Friend</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Custom Message
                    </label>
                    <Input
                      placeholder="Hey bestie, I bet you're more single than me!"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                    />
                  </div>
                  <Button onClick={generateInviteLink}>Generate Link</Button>
                  {inviteLink && (
                    <div className="mt-4">
                      <Input value={inviteLink} readOnly />
                      <Button
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={() => {
                          navigator.clipboard.writeText(inviteLink);
                          alert("Link copied!");
                        }}
                      >
                        Copy Link
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <PremiumFeatures />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
