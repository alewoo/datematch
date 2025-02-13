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
  const profile: PersonalityTraits = JSON.parse(
    decodeURIComponent(searchParams.get("profile") || "{}")
  );
  const [customMessage, setCustomMessage] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [personalityType, setPersonalityType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const traitDescriptions = {
    socialStyle: {
      high: "You're naturally social and thrive in group settings",
      low: "You prefer more intimate, one-on-one interactions",
    },
    emotionalReadiness: {
      high: "You're emotionally prepared for a serious relationship",
      low: "You might want to focus on personal growth before serious dating",
    },
    dateStyle: {
      high: "You have a modern, proactive approach to dating",
      low: "You prefer traditional, organic ways of meeting people",
    },
    commitment: {
      high: "You value stable, long-term relationships",
      low: "You prefer keeping your options open",
    },
    communication: {
      high: "You're an excellent communicator in relationships",
      low: "You might want to work on expressing yourself more openly",
    },
    independence: {
      high: "You strongly value your autonomy",
      low: "You're comfortable with interdependence",
    },
    career: {
      high: "Your career/education is a top priority",
      low: "You balance career with other life aspects",
    },
    flexibility: {
      high: "You're adaptable in relationship situations",
      low: "You have clear preferences and boundaries",
    },
  };

  const chartData = Object.entries(profile).map(([key, value]) => ({
    trait: key
      .replace(/([A-Z])/g, " $1")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase()),
    value: value,
  }));

  const getAnalysis = (trait: keyof PersonalityTraits) => {
    const score = profile[trait];
    return score > 6
      ? traitDescriptions[trait].high
      : traitDescriptions[trait].low;
  };

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

  const { strengths, areasForGrowth } = getOverallAnalysis();

  const generateInviteLink = () => {
    const baseUrl = window.location.origin;
    const encodedMessage = encodeURIComponent(customMessage);
    const link = `${baseUrl}?invite=${encodedMessage}`;
    setInviteLink(link);
  };

  const shareResult = async () => {
    const shareText = `I scored ${Object.values(profile).reduce(
      (a, b) => a + b,
      0
    )}% on the "Will You Stay Single Forever?" quiz and got "${
      resultCategories[0].title
    }"! Take it yourself:`;
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

  // const launchConfetti = () => {
  //   confetti({
  //     particleCount: 100,
  //     spread: 70,
  //     origin: { y: 0.6 },
  //   });
  // };

  // useEffect(() => {
  //   launchConfetti();
  // }, []); // Removed launchConfetti from the dependency array

  useEffect(() => {
    if (profile) {
      const insight = getPersonalityInsight(profile);
      setTitle(insight.title);
      setDescription(insight.description);
    }
  }, [profile]);

  const getPersonalityType = () => {
    const dominantTraits = Object.entries(profile)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([trait]) => trait);

    // Create personality archetypes based on top traits
    const archetypes = {
      "socialStyle-emotionalReadiness": "The Social Butterfly 🦋",
      "socialStyle-dateStyle": "The Campus Connector 🌟",
      "emotionalReadiness-commitment": "The Relationship Ready 💝",
      "career-independence": "The Ambitious Independent 💼",
      "communication-flexibility": "The Smooth Operator 🎭",
      // Add more combinations...
    };

    const key = dominantTraits.sort().join("-");
    return archetypes[key] || "The Balanced Explorer ⭐";
  };

  const getCompatibilityInsights = () => {
    return {
      bestMatch:
        profile.socialStyle > 7
          ? "Someone who enjoys campus social life but respects your independence"
          : "Someone who values deep one-on-one connections",
      whereToMeet:
        profile.dateStyle > 7
          ? ["Campus coffee shops", "Student organizations", "Social events"]
          : ["Study groups", "Through mutual friends", "Hobby-based clubs"],
      potentialChallenges:
        profile.commitment > 7
          ? "Balancing relationship time with academic priorities"
          : "Opening up to new connections while maintaining independence",
    };
  };

  const getTraitLevel = (trait: string, score: number) => {
    const traitLevels: Record<
      string,
      Array<{ threshold: number; label: string; color: string }>
    > = {
      socialStyle: [
        { threshold: 8, label: "Social Butterfly", color: "text-rose-500" },
        { threshold: 6, label: "Outgoing", color: "text-rose-400" },
        { threshold: 4, label: "Selective", color: "text-purple-400" },
        { threshold: 2, label: "Reserved", color: "text-purple-500" },
        { threshold: 0, label: "Private", color: "text-purple-600" },
      ],
      emotionalReadiness: [
        { threshold: 8, label: "Fully Ready", color: "text-rose-500" },
        { threshold: 6, label: "Open to Love", color: "text-rose-400" },
        { threshold: 4, label: "Still Exploring", color: "text-purple-400" },
        { threshold: 2, label: "Taking Time", color: "text-purple-500" },
        { threshold: 0, label: "Self-Focused", color: "text-purple-600" },
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
    };

    const levels = traitLevels[trait] || traitLevels.socialStyle;
    for (const level of levels) {
      if (score >= level.threshold) {
        return level;
      }
    }
    return levels[levels.length - 1];
  };

  const getStrengthsAndGrowth = (profile: PersonalityTraits) => {
    const strengths = [];
    const growthAreas = [];

    // Social Style
    if (profile.socialStyle > 6) {
      strengths.push("Natural at building social connections");
    } else if (profile.socialStyle > 4) {
      strengths.push("Good at maintaining meaningful relationships");
    } else if (profile.socialStyle < 4) {
      strengths.push("Skilled at deep one-on-one connections");
    }

    // Emotional Readiness
    if (profile.emotionalReadiness > 6) {
      strengths.push("Emotionally mature and self-aware");
    } else if (profile.emotionalReadiness < 4) {
      growthAreas.push("Take time to understand your emotional needs");
    }

    // Date Style
    if (profile.dateStyle > 6) {
      strengths.push("Confident and clear about what you want");
    } else if (profile.dateStyle > 4) {
      strengths.push("Balanced approach to dating");
    } else {
      strengths.push("Thoughtful and intentional about dating");
    }

    // Communication
    if (profile.communication > 6) {
      strengths.push("Strong communicator who expresses feelings clearly");
    } else if (profile.communication < 4) {
      growthAreas.push("Practice expressing your feelings more openly");
    }

    // Independence
    if (profile.independence > 6) {
      strengths.push("Strong sense of self and healthy boundaries");
    } else if (profile.independence > 4) {
      strengths.push("Good balance of independence and connection");
    }

    // Commitment
    if (profile.commitment > 6) {
      strengths.push("Loyal and dedicated in relationships");
    } else if (profile.commitment < 4) {
      strengths.push("Values personal freedom and authenticity");
    }

    // Career Focus
    if (profile.career > 6) {
      strengths.push("Clear goals and ambitions");
    } else if (profile.career > 4) {
      strengths.push("Good work-life balance awareness");
    }

    // Flexibility
    if (profile.flexibility > 6) {
      strengths.push("Adaptable and open to new experiences");
    } else if (profile.flexibility < 4) {
      growthAreas.push("Consider being more open to different perspectives");
    }

    // Add general growth areas if we don't have enough
    if (growthAreas.length < 2) {
      if (profile.communication < 6) {
        growthAreas.push("Enhance communication skills in dating contexts");
      }
      if (profile.emotionalReadiness < 6) {
        growthAreas.push("Explore your emotional needs and boundaries");
      }
      if (profile.flexibility < 6) {
        growthAreas.push("Practice being more adaptable in relationships");
      }
    }

    // Ensure we have at least one strength
    if (strengths.length === 0) {
      strengths.push("Good self-awareness and willingness to grow");
    }

    return {
      strengths: [...new Set(strengths)].slice(0, 4), // Limit to 4 unique strengths
      growthAreas: [...new Set(growthAreas)].slice(0, 3), // Limit to 3 unique growth areas
    };
  };

  const getCompatibilityProfile = (profile: PersonalityTraits) => {
    const bestMatches = [];
    const challengingMatches = [];

    // Based on their profile, determine compatibility
    if (profile.socialStyle > 6) {
      bestMatches.push("Outgoing individuals who enjoy social scenes");
    } else {
      bestMatches.push("Someone who values intimate, one-on-one time");
    }

    if (profile.independence > 6) {
      challengingMatches.push("People who need constant attention");
      bestMatches.push("Independent individuals who respect personal space");
    }

    if (profile.commitment > 6) {
      challengingMatches.push("Those looking for casual connections");
    } else {
      challengingMatches.push("People seeking immediate serious commitment");
    }

    return { bestMatches, challengingMatches };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 py-12 px-4">
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

        {/* Quick Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {Object.entries(profile).map(([trait, score], index) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 text-center relative group"
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
          className="flex justify-center space-x-4 pt-6"
        >
          <Button
            onClick={shareResult}
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl flex items-center"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
          <Button
            onClick={downloadResultCard}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Card
          </Button>
          <Button
            onClick={() => router.push("/find-match")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center"
          >
            <Heart className="w-5 h-5 mr-2" />
            Find Your Match
          </Button>
        </motion.div>
      </div>
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
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
