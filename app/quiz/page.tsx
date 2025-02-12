"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { questions } from "@/app/data/questions"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const router = useRouter()

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalScore = newAnswers.reduce((acc, curr) => acc + curr, 0)
      const averageScore = totalScore / questions.length
      router.push(`/results?score=${Math.round(averageScore)}`)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

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
              <div className="flex items-center justify-center mb-6">{questions[currentQuestion].icon}</div>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{questions[currentQuestion].text}</h2>
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
                      onClick={() => handleAnswer(answer.score)}
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
  )
}

