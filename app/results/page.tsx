"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Share2, Heart, Download } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { Suspense } from "react";

import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { PersonalityTraits } from "@/app/data/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TraitLevel {
  threshold: number;
  label: string;
  color: string;
}

function ResultsParams() {
  const searchParams = useSearchParams();
  const profile = JSON.parse(
    decodeURIComponent(searchParams.get("profile") || "{}")
  );
  return <ResultsContent profile={profile} />;
}

function ResultsContent({ profile }: { profile: PersonalityTraits }) {
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const posthog = usePostHog();

  const chartData = Object.entries(profile).map(([key, value]) => ({
    trait: key
      .replace(/([A-Z])/g, " $1")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase()),
    value: value,
  }));

  const getOverallAnalysis = () => {
    const traits = Object.entries(profile);
    const highestTraits = traits
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([trait]) => trait);

    const lowestTraits = traits
      .sort(([, a], [, b]) => a - b)
      .slice(0, 2)
      .map(([trait]) => trait);

    return {
      strengths: highestTraits,
      areasForGrowth: lowestTraits,
    };
  };

  useEffect(() => {
    if (profile) {
      // Track when results are viewed
      posthog.capture("results_viewed", {
        profile: profile,
        timestamp: new Date().toISOString(),
      });
    }
  }, [profile, posthog]);

  const shareResult = async () => {
    const { strengths: topStrengths } = getOverallAnalysis();
    const shareText = `I got "${title}" on the DateMatch quiz! My top traits are ${topStrengths.join(
      ", "
    )}. Take it yourself:`;
    const shareUrl = "https://datematch.lol";

    posthog.capture("share_result", {
      title,
      topStrengths,
      shareMethod:
        typeof navigator !== "undefined" && "share" in navigator
          ? "native_share"
          : "fallback",
    });

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "My DateMatch Results",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  const downloadResultCard = async () => {
    posthog.capture("download_result_card");
    if (!resultCardRef.current) return;

    try {
      // Make the card temporarily visible for capture
      resultCardRef.current.style.visibility = "visible";
      resultCardRef.current.style.position = "fixed";
      resultCardRef.current.style.top = "0";
      resultCardRef.current.style.left = "0";

      // Wait for any animations/renders to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(resultCardRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 2,
        width: 1200,
        height: 630,
      });

      // Hide the card again
      resultCardRef.current.style.visibility = "hidden";
      resultCardRef.current.style.position = "absolute";

      // Download the image
      const link = document.createElement("a");
      link.download = `datematch-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  useEffect(() => {
    if (profile) {
      const insight = getPersonalityInsight(profile);
      setTitle(insight.title);
      setDescription(insight.description);
    }
  }, [profile]);

  const getTraitLevel = (trait: string, score: number) => {
    const levels: Record<string, TraitLevel[]> = {
      socialStyle: [
        { threshold: 8, label: "Highly Social", color: "text-rose-500" },
        { threshold: 6, label: "Moderately Social", color: "text-rose-400" },
        { threshold: 4, label: "Selectively Social", color: "text-purple-400" },
        { threshold: 0, label: "Private", color: "text-purple-500" },
      ],
      emotionalReadiness: [
        { threshold: 8, label: "Fully Ready", color: "text-rose-500" },
        { threshold: 6, label: "Getting Ready", color: "text-rose-400" },
        { threshold: 4, label: "Taking Time", color: "text-purple-400" },
        { threshold: 0, label: "Self-Focused", color: "text-purple-500" },
      ],
      dateStyle: [
        { threshold: 8, label: "Bold & Direct", color: "text-rose-500" },
        { threshold: 6, label: "Proactive", color: "text-rose-400" },
        { threshold: 4, label: "Balanced", color: "text-purple-400" },
        { threshold: 2, label: "Traditional", color: "text-purple-500" },
        { threshold: 0, label: "Cautious", color: "text-purple-600" },
      ],
      commitment: [
        { threshold: 8, label: "All In", color: "text-rose-500" },
        { threshold: 6, label: "Relationship-Minded", color: "text-rose-400" },
        { threshold: 4, label: "Going with Flow", color: "text-purple-400" },
        {
          threshold: 2,
          label: "Keeping Options Open",
          color: "text-purple-500",
        },
        { threshold: 0, label: "Freedom-Focused", color: "text-purple-600" },
      ],
      communication: [
        { threshold: 8, label: "Expert", color: "text-rose-500" },
        { threshold: 6, label: "Direct", color: "text-rose-400" },
        { threshold: 4, label: "Developing", color: "text-purple-400" },
        { threshold: 2, label: "Reserved", color: "text-purple-500" },
        { threshold: 0, label: "Guarded", color: "text-purple-600" },
      ],
      independence: [
        { threshold: 8, label: "Free Spirit", color: "text-rose-500" },
        { threshold: 6, label: "Self-Reliant", color: "text-rose-400" },
        { threshold: 4, label: "Balanced", color: "text-purple-400" },
        { threshold: 2, label: "Team Player", color: "text-purple-500" },
        { threshold: 0, label: "Connection-Focused", color: "text-purple-600" },
      ],
      career: [
        { threshold: 8, label: "Career-Driven", color: "text-rose-500" },
        { threshold: 6, label: "Ambitious", color: "text-rose-400" },
        { threshold: 4, label: "Balanced", color: "text-purple-400" },
        { threshold: 2, label: "Flexible", color: "text-purple-500" },
        { threshold: 0, label: "Life-Focused", color: "text-purple-600" },
      ],
      flexibility: [
        { threshold: 8, label: "Super Adaptable", color: "text-rose-500" },
        { threshold: 6, label: "Open-Minded", color: "text-rose-400" },
        { threshold: 4, label: "Balanced", color: "text-purple-400" },
        { threshold: 2, label: "Structured", color: "text-purple-500" },
        { threshold: 0, label: "Clear Boundaries", color: "text-purple-600" },
      ],
    } as const;

    const traitLevels = levels[trait] || levels.socialStyle;
    return (
      traitLevels.find((level: TraitLevel) => score >= level.threshold) ||
      traitLevels[traitLevels.length - 1]
    );
  };

  const getStrengthsAndGrowth = (profile: PersonalityTraits) => {
    const strengths = [];
    const growthAreas = [];

    // More specific social style strengths
    if (profile.socialStyle > 7) {
      strengths.push(
        "Exceptional at building and maintaining social connections"
      );
    } else if (profile.socialStyle > 5) {
      strengths.push("Natural at building social connections");
    } else if (profile.socialStyle < 4) {
      strengths.push(
        "Great at forming deep, meaningful one-on-one connections"
      );
    }

    // Emotional readiness insights
    if (profile.emotionalReadiness > 7) {
      strengths.push("Highly self-aware and emotionally mature");
    } else if (profile.emotionalReadiness > 5) {
      strengths.push("Emotionally mature and self-aware");
    } else if (profile.emotionalReadiness < 4) {
      growthAreas.push("Focus on understanding your emotional needs better");
    }

    // Dating style insights
    if (profile.dateStyle > 7) {
      strengths.push("Very confident and clear about relationship goals");
    } else if (profile.dateStyle > 5) {
      strengths.push("Confident and clear about what you want");
    } else if (profile.dateStyle < 4) {
      strengths.push("Thoughtful and intentional in your approach to dating");
    }

    // Communication insights
    if (profile.communication > 7) {
      strengths.push("Excellent at expressing feelings and needs clearly");
    } else if (profile.communication > 5) {
      strengths.push("Strong communicator who expresses feelings well");
    } else if (profile.communication < 4) {
      growthAreas.push("Work on expressing your feelings more openly");
    }

    // Independence insights
    if (profile.independence > 7) {
      strengths.push("Strongly independent with healthy boundaries");
    } else if (profile.independence > 5) {
      strengths.push("Good balance of independence and connection");
    } else if (profile.independence < 4) {
      growthAreas.push("Find balance between independence and connection");
    }

    // Commitment insights
    if (profile.commitment > 7) {
      strengths.push("Deeply committed and loyal in relationships");
    } else if (profile.commitment < 4) {
      strengths.push("Values personal growth and authenticity");
    }

    // Career focus insights
    if (profile.career > 7) {
      strengths.push("Clear ambitions with strong life goals");
    } else if (profile.career > 5) {
      strengths.push("Good balance of career and personal life");
    }

    // Flexibility insights
    if (profile.flexibility > 7) {
      strengths.push("Highly adaptable in relationship dynamics");
    } else if (profile.flexibility < 4) {
      growthAreas.push("Practice being more open to different perspectives");
    }

    // Add personalized growth areas if needed
    if (growthAreas.length < 2) {
      if (profile.socialStyle < 7) {
        growthAreas.push(
          "Explore more social connections and group activities"
        );
      }
      if (profile.dateStyle < 7) {
        growthAreas.push("Try new approaches to meeting potential partners");
      }
      if (profile.flexibility < 7) {
        growthAreas.push(
          "Consider being more flexible in your dating approach"
        );
      }
    }

    return {
      strengths: Array.from(new Set(strengths)).slice(0, 4), // Limit to 4 unique strengths
      growthAreas: Array.from(new Set(growthAreas)).slice(0, 3), // Limit to 3 unique growth areas
    };
  };

  const getCompatibilityProfile = (profile: PersonalityTraits) => {
    const bestMatches = [];
    const challengingMatches = [];

    // Social style compatibility
    if (profile.socialStyle > 7) {
      bestMatches.push("Socially active people who enjoy group activities");
    } else if (profile.socialStyle < 4) {
      bestMatches.push("People who value deep, meaningful conversations");
    }

    // Independence compatibility
    if (profile.independence > 7) {
      bestMatches.push("Independent individuals who respect personal space");
      challengingMatches.push(
        "People who need constant attention or validation"
      );
    } else if (profile.independence < 4) {
      bestMatches.push("People who value close, interdependent relationships");
      challengingMatches.push(
        "Extremely independent or emotionally distant people"
      );
    }

    // Communication style
    if (profile.communication > 7) {
      bestMatches.push("Open communicators who share their feelings readily");
    } else if (profile.communication < 4) {
      challengingMatches.push("Overly direct or confrontational communicators");
    }

    // Commitment level
    if (profile.commitment > 7) {
      bestMatches.push("People seeking long-term, committed relationships");
      challengingMatches.push("Those looking for casual connections");
    } else if (profile.commitment < 4) {
      bestMatches.push("People who take relationships day by day");
      challengingMatches.push("Those pushing for immediate serious commitment");
    }

    // Career focus
    if (profile.career > 7) {
      bestMatches.push("Ambitious individuals with clear career goals");
      challengingMatches.push("People without professional aspirations");
    }

    return {
      bestMatches: Array.from(new Set(bestMatches)).slice(0, 2), // Limit to 2 unique matches
      challengingMatches: Array.from(new Set(challengingMatches)).slice(0, 2), // Limit to 2 unique challenges
    };
  };

  // Add this helper function to generate a personalized title and description
  const getPersonalityInsight = (profile: PersonalityTraits) => {
    // Determine dominant traits and their scores
    const traits = Object.entries(profile).sort(([, a], [, b]) => b - a);
    const [primaryTrait, primaryScore] = traits[0];

    // Generate title based on primary trait and its score
    let title = "";
    if (primaryTrait === "socialStyle") {
      title =
        primaryScore > 6 ? "The Social Connector" : "The Thoughtful Observer";
    } else if (primaryTrait === "emotionalReadiness") {
      title = primaryScore > 6 ? "The Emotionally Aware" : "The Self-Explorer";
    } else if (primaryTrait === "dateStyle") {
      title =
        primaryScore > 6 ? "The Modern Dater" : "The Traditional Romantic";
    } else if (primaryTrait === "commitment") {
      title = primaryScore > 6 ? "The Relationship Seeker" : "The Free Spirit";
    } else if (primaryTrait === "communication") {
      title =
        primaryScore > 6 ? "The Clear Communicator" : "The Quiet Observer";
    } else if (primaryTrait === "independence") {
      title = primaryScore > 6 ? "The Independent Soul" : "The Team Player";
    } else if (primaryTrait === "career") {
      title = primaryScore > 6 ? "The Ambitious Planner" : "The Life Balancer";
    } else if (primaryTrait === "flexibility") {
      title = primaryScore > 6 ? "The Adaptable Spirit" : "The Steady Rock";
    }

    // Generate description based on overall profile
    let description = "";
    if (profile.socialStyle > 6 && profile.independence > 6) {
      description =
        "You balance social connections with strong independence, creating meaningful relationships while maintaining your sense of self.";
    } else if (profile.emotionalReadiness > 6 && profile.communication > 6) {
      description =
        "Your emotional awareness and communication skills make you naturally skilled at building authentic connections.";
    } else if (profile.dateStyle > 6 && profile.flexibility > 6) {
      description =
        "You approach dating with an open mind and adaptability, ready to explore different kinds of connections.";
    } else if (profile.commitment < 4 && profile.independence > 6) {
      description =
        "You value your independence and prefer taking things slow, focusing on personal growth while staying open to connections.";
    } else {
      description =
        "You have a unique approach to dating that reflects your individual values and priorities.";
    }

    return { title, description };
  };

  const getTraitDescription = (
    trait: keyof PersonalityTraits,
    score: number
  ) => {
    const descriptions = {
      socialStyle:
        score > 6
          ? "You're naturally social and thrive in group settings"
          : "You prefer more intimate, one-on-one interactions",
      emotionalReadiness:
        score > 6
          ? "You're emotionally prepared for a serious relationship"
          : "You might want to focus on personal growth before serious dating",
      dateStyle:
        score > 6
          ? "You have a modern, proactive approach to dating"
          : "You prefer traditional, organic ways of meeting people",
      commitment:
        score > 6
          ? "You value stable, long-term relationships"
          : "You prefer keeping your options open",
      communication:
        score > 6
          ? "You're an excellent communicator in relationships"
          : "You might want to work on expressing yourself more openly",
      independence:
        score > 6
          ? "You strongly value your autonomy"
          : "You're comfortable with interdependence",
      career:
        score > 6
          ? "Your career/education is a top priority"
          : "You balance career with other life aspects",
      flexibility:
        score > 6
          ? "You're adaptable in relationship situations"
          : "You have clear preferences and boundaries",
    };
    return descriptions[trait];
  };

  const gradientId = "colorGradient";

  const DownloadCard = () => (
    <div
      ref={resultCardRef}
      className="fixed left-0 top-0 w-[1200px] h-[630px]"
      style={{
        visibility: "hidden",
        position: "fixed",
        backgroundColor: "#fff",
        padding: "40px",
        zIndex: -1,
      }}
    >
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 h-full flex flex-col items-center justify-between shadow-lg">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-2">✨</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            {title}
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl">{description}</p>
        </div>

        {/* Radar Chart */}
        <div className="w-[400px] h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="trait"
                tick={{ fill: "#6b7280", fontSize: 14 }}
              />
              <Radar
                name="Your Profile"
                dataKey="value"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Traits */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 justify-center">
            {Object.entries(profile)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([trait]) => (
                <div
                  key={trait}
                  className="flex items-center whitespace-nowrap bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100"
                >
                  <span className="mr-2">{getTraitEmoji(trait)}</span>
                  <span className="text-gray-700 capitalize">
                    {trait
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .toLowerCase()}
                  </span>
                </div>
              ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="font-medium">datematch.lol</span>
            <Heart className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 py-12 px-4">
      {/* Logo */}
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

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Personality Type Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center mb-6"
        >
          {profile && (
            <>
              <h1 className="text-3xl font-bold mb-3">{title}</h1>
              <div className="text-lg text-gray-600">{description}</div>
            </>
          )}
        </motion.div>

        {/* Your Love Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="bg-pink-100 p-2 rounded-lg mr-2">💝</span>
            Your Love Profile
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="trait"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 10]}
                  tick={{ fill: "#6b7280" }}
                />
                <Radar
                  name="Your Profile"
                  dataKey="value"
                  stroke="url(#colorGradient)"
                  fill="url(#colorGradient)"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {Object.entries(profile).map(([trait, score]) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 text-center relative group shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl mb-2">{getTraitEmoji(trait)}</div>
              <div className="text-sm text-gray-600">
                {trait.replace(/([A-Z])/g, " $1").toLowerCase()}
              </div>
              <div
                className={`text-lg font-bold ${
                  getTraitLevel(trait, score).color
                }`}
              >
                {getTraitLevel(trait, score).label}
              </div>

              {/* Tooltip */}
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 bg-gray-800 text-white p-2 rounded-lg text-sm w-48 bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                {getTraitDescription(trait as keyof PersonalityTraits, score)}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Strengths & Growth Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="bg-rose-100 p-2 rounded-lg mr-2">💪</span>
            Your Dating Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-rose-500">
                Relationship Strengths
              </h3>
              <ul className="space-y-2">
                {getStrengthsAndGrowth(profile).strengths.map((strength, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-gray-600">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-500">
                Growth Opportunities
              </h3>
              <ul className="space-y-2">
                {getStrengthsAndGrowth(profile).growthAreas.map((area, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-gray-600">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Compatibility Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="bg-purple-100 p-2 rounded-lg mr-2">🎯</span>
            Compatibility Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-rose-500">
                Best Matches
              </h3>
              <ul className="space-y-2">
                {getCompatibilityProfile(profile).bestMatches.map(
                  (match, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-rose-500 mr-2">•</span>
                      <span className="text-gray-600">{match}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-500">
                Potential Challenges
              </h3>
              <ul className="space-y-2">
                {getCompatibilityProfile(profile).challengingMatches.map(
                  (match, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-purple-500 mr-2">•</span>
                      <span className="text-gray-600">{match}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-6 pt-8"
        >
          <Button
            onClick={shareResult}
            className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-8 py-6 rounded-xl flex items-center transition-all duration-300 text-lg"
          >
            <Share2 className="w-6 h-6 mr-3" />
            Share Results
          </Button>
          <Button
            onClick={downloadResultCard}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 rounded-xl flex items-center transition-all duration-300 text-lg"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Card
          </Button>
          <Button
            onClick={() => router.push("/find-match")}
            className="bg-gradient-to-r from-purple-400 to-violet-500 hover:from-purple-500 hover:to-violet-600 text-white px-8 py-6 rounded-xl flex items-center transition-all duration-300 text-lg"
          >
            <Heart className="w-6 h-6 mr-3" />
            Find Your Match
          </Button>
        </motion.div>
      </div>

      <DownloadCard />
    </div>
  );
}

function getTraitEmoji(trait: string): string {
  const emojiMap: Record<string, string> = {
    socialStyle: "👥",
    emotionalReadiness: "❤️",
    dateStyle: "💫",
    commitment: "🤝",
    communication: "💭",
    independence: "⭐",
    career: "💼",
    flexibility: "🌊",
  };
  return emojiMap[trait] || "✨";
}

export default function Results() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      }
    >
      <ResultsParams />
    </Suspense>
  );
}
