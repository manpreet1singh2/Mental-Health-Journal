"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EmotionResponse } from "@/types/emotions"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface EmotionDisplayProps {
  analysis: EmotionResponse
}

export default function EmotionDisplay({ analysis }: EmotionDisplayProps) {
  const getEmotionColor = (emotion: string) => {
    const emotionColors: Record<string, string> = {
      happy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      sad: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      anxious: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      angry: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      stressed: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      excited: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      depressed: "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300",
      hopeful: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
      confused: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      lonely: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      grateful: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      content: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      overwhelmed: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      worried: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
      disappointed: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
      reflective: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
      neutral: "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300",
      mixed: "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300",
      tense: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
      frustrated: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
    }

    return emotionColors[emotion.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300"
  }

  const getEmotionEmoji = (emotion: string) => {
    const emotionEmojis: Record<string, string> = {
      happy: "😊",
      sad: "😢",
      anxious: "😰",
      angry: "😡",
      stressed: "😫",
      excited: "🤩",
      depressed: "😔",
      hopeful: "🙂",
      confused: "🤔",
      lonely: "😕",
      grateful: "🙏",
      content: "😌",
      overwhelmed: "😩",
      worried: "😟",
      disappointed: "😞",
      reflective: "🤗",
      neutral: "😐",
      mixed: "😶",
      tense: "😬",
      frustrated: "😤",
    }

    return emotionEmojis[emotion.toLowerCase()] || "🙂"
  }

  return (
    <Card className="glass-card border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Your Emotional State
        </CardTitle>
        <CardDescription>Based on your journal entry</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Primary Emotion</h3>
          <Badge className={`text-sm py-1 px-3 ${getEmotionColor(analysis.primary_emotion)}`}>
            {getEmotionEmoji(analysis.primary_emotion)} {analysis.primary_emotion}
          </Badge>
        </motion.div>

        {analysis.secondary_emotions && analysis.secondary_emotions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Secondary Emotions</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.secondary_emotions.map((emotion, index) => (
                <Badge key={index} variant="outline" className={`text-sm py-1 px-3 ${getEmotionColor(emotion)}`}>
                  {getEmotionEmoji(emotion)} {emotion}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Summary</h3>
          <p className="text-sm p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">{analysis.emotional_summary}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Self-Care Tips</h3>
          <ul className="space-y-2">
            {analysis.self_care_tips.map((tip, index) => (
              <li key={index} className="text-sm flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                <span className="text-purple-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {analysis.support_message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800/30"
          >
            <p className="text-sm text-blue-800 dark:text-blue-300">{analysis.support_message}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
