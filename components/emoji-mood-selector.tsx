"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EmojiMoodSelectorProps {
  onSelect: (mood: string) => void
}

export default function EmojiMoodSelector({ onSelect }: EmojiMoodSelectorProps) {
  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😫", label: "Stressed" },
    { emoji: "🤩", label: "Excited" },
    { emoji: "😔", label: "Depressed" },
    { emoji: "🤔", label: "Confused" },
    { emoji: "🙂", label: "Hopeful" },
    { emoji: "😕", label: "Lonely" },
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center mb-4">
        Click an emoji to instantly create a journal entry based on that mood
      </p>
      <div className="grid grid-cols-5 gap-4">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex flex-col h-auto py-4 w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 border border-gray-100 dark:border-gray-800"
                    onClick={() => onSelect(mood.label)}
                  >
                    <span className="text-3xl mb-2">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate a {mood.label.toLowerCase()} journal entry</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
