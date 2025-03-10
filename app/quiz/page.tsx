"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PersonalityTraits, Answer } from "@/app/data/types";
import { getRandomQuestions } from "@/app/data/questionBank";
import { Suspense } from "react";
import { usePostHog } from "posthog-js/react";

function QuizContent() {
  // Get 12 random questions when component first loads
  const [questions] = useState(() => getRandomQuestions(12));
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track which question user is currently on
  const [answers, setAnswers] = useState<Answer[]>([]); // Store all user's answers
  const router = useRouter();
  const posthog = usePostHog();

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer]; // Add new answer to the array
    setAnswers(newAnswers);

    // Track answer in PostHog analytics
    posthog.capture("quiz_answer", {
      questionNumber: currentQuestion + 1,
      totalQuestions: questions.length,
      answer: answer.text,
    });

    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz is complete
      // Calculate personality profile
      const profile = calculatePersonalityProfile(newAnswers);

      // Track quiz completion
      posthog.capture("quiz_complete", {
        numberOfQuestions: questions.length,
        profile: profile,
      });

      // go to results page
      router.push(
        `/results?profile=${encodeURIComponent(JSON.stringify(profile))}`
      );
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Progress value={progress} className="mb-8" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="flex items-center justify-center mb-6">
                {questions[currentQuestion].icon}
              </div>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-left p-4 hover:bg-pink-50 text-gray-700"
                      onClick={() => handleAnswer(answer)}
                    >
                      {answer.text}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function calculatePersonalityProfile(answers: Answer[]): PersonalityTraits {
  const initialProfile: PersonalityTraits = {
    socialStyle: 5, // Start from middle values
    emotionalReadiness: 5,
    dateStyle: 5,
    commitment: 5,
    communication: 5,
    independence: 5,
    career: 5,
    flexibility: 5,
  };

  // Calculate weighted scores based on number of questions per trait
  const traitCounts: Record<keyof PersonalityTraits, number> = {
    socialStyle: 0,
    emotionalReadiness: 0,
    dateStyle: 0,
    commitment: 0,
    communication: 0,
    independence: 0,
    career: 0,
    flexibility: 0,
  };

  // Calculate total scores
  const profile = answers.reduce((acc, answer) => {
    Object.entries(answer.traits).forEach(([trait, value]) => {
      acc[trait as keyof PersonalityTraits] += value;
      traitCounts[trait as keyof PersonalityTraits]++;
    });
    return acc;
  }, initialProfile);

  // Normalize scores considering question count per trait
  Object.keys(profile).forEach((trait) => {
    const traitKey = trait as keyof PersonalityTraits;
    if (traitCounts[traitKey] > 0) {
      profile[traitKey] = profile[traitKey] / traitCounts[traitKey];
    }
  });

  return profile;
}

export default function Quiz() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
