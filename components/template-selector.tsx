"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { journalTemplates } from "@/lib/journal-templates"
import type { JournalTemplate } from "@/types/templates"
import { motion } from "framer-motion"
import { Heart, Pencil, Sparkles, Gauge, Target, Smile } from "lucide-react"

interface TemplateSelectorProps {
  onSelect: (template: JournalTemplate) => void
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return <Heart className="h-5 w-5" />
      case "Pencil":
        return <Pencil className="h-5 w-5" />
      case "Sparkles":
        return <Sparkles className="h-5 w-5" />
      case "Gauge":
        return <Gauge className="h-5 w-5" />
      case "Target":
        return <Target className="h-5 w-5" />
      case "Smile":
        return <Smile className="h-5 w-5" />
      default:
        return <Pencil className="h-5 w-5" />
    }
  }

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      pink: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      orange: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      teal: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
    }
    return colorMap[color] || "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300"
  }

  const handleSelect = (template: JournalTemplate) => {
    setSelectedId(template.id)
    onSelect(template)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {journalTemplates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card
            className={`cursor-pointer transition-all duration-200 h-full ${
              selectedId === template.id
                ? "border-2 border-primary shadow-md"
                : "border border-gray-100 dark:border-gray-800"
            }`}
            onClick={() => handleSelect(template)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-full ${getColorClass(template.color)}`}>{getIcon(template.icon)}</div>
                <h3 className="font-medium">{template.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <div className="mt-auto">
                <Button
                  variant={selectedId === template.id ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => handleSelect(template)}
                >
                  {selectedId === template.id ? "Selected" : "Use Template"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
