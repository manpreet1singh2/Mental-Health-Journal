"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Calendar } from "lucide-react"
import type { EmotionResponse } from "@/types/emotions"
import { motion } from "framer-motion"

interface MoodInsightsProps {
  analysis: EmotionResponse
  streak: number
}

export default function MoodInsights({ analysis, streak }: MoodInsightsProps) {
  // Generate random insights based on the emotion
  const getRandomInsight = (emotion: string) => {
    const insights = {
      happy: [
        "Happiness often comes from appreciating small moments",
        "Positive emotions can boost your immune system",
        "Sharing your joy with others can amplify it",
      ],
      sad: [
        "Sadness is a natural response to loss or disappointment",
        "Expressing sadness can help process difficult emotions",
        "Temporary sadness is different from depression",
      ],
      anxious: [
        "Anxiety often focuses on future uncertainties",
        "Deep breathing can help reduce anxious feelings",
        "Naming your anxieties can reduce their power",
      ],
      angry: [
        "Anger often masks other emotions like hurt or fear",
        "Physical activity can help release angry energy",
        "Counting to ten before responding can help manage anger",
      ],
      stressed: [
        "Stress in small doses can actually be motivating",
        "Regular breaks can help manage stress levels",
        "Prioritizing tasks can reduce feeling overwhelmed",
      ],
    }

    const defaultInsights = [
      "Regular journaling can improve emotional awareness",
      "Naming emotions helps process them more effectively",
      "Self-reflection contributes to better mental health",
    ]

    return (insights[emotion.toLowerCase()] || defaultInsights)[Math.floor(Math.random() * 3)]
  }

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start journaling today to build your streak!"
    if (streak === 1) return "Great start! You've journaled for 1 day."
    if (streak < 7) return `Keep going! You've journaled for ${streak} days.`
    if (streak === 7) return "One week streak! Excellent commitment!"
    if (streak < 30) return `Impressive! ${streak} day journaling streak!`
    if (streak === 30) return "Amazing! A full month of journaling!"
    return `Incredible dedication! ${streak} day streak!`
  }

  const insight = getRandomInsight(analysis.primary_emotion)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-500" />
          Mood Insights
        </CardTitle>
        <CardDescription>Personalized observations about your emotional patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-purple-600 mt-0.5" />
            <p className="text-sm">{insight}</p>
          </div>
        </motion.div>

        <motion.div
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm">{getStreakMessage(streak)}</p>
          </div>
        </motion.div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Journal Prompts for Tomorrow</h3>
          <ul className="space-y-2">
            <motion.li
              className="text-sm p-2 bg-gray-50 dark:bg-gray-800/50 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              What are three things that brought you joy today, no matter how small?
            </motion.li>
            <motion.li
              className="text-sm p-2 bg-gray-50 dark:bg-gray-800/50 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              How did you take care of yourself today?
            </motion.li>
            <motion.li
              className="text-sm p-2 bg-gray-50 dark:bg-gray-800/50 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              What's one thing you're looking forward to tomorrow?
            </motion.li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
