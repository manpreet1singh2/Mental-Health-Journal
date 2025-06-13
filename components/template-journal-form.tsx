"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { JournalTemplate, TemplateResponse } from "@/types/templates"
import { motion } from "framer-motion"

interface TemplateJournalFormProps {
  template: JournalTemplate
  onSubmit: (responses: TemplateResponse) => void
  isLoading: boolean
}

export default function TemplateJournalForm({ template, onSubmit, isLoading }: TemplateJournalFormProps) {
  const [responses, setResponses] = useState<TemplateResponse>({})

  const handleInputChange = (id: string, value: string | number | string[]) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(responses)
  }

  const isValid = () => {
    return template.prompts
      .filter((prompt) => prompt.required)
      .every((prompt) => {
        const response = responses[prompt.id]
        if (Array.isArray(response)) {
          return response.length > 0
        }
        return response !== undefined && response !== ""
      })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {template.prompts.map((prompt, index) => (
        <motion.div
          key={prompt.id}
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Label htmlFor={prompt.id} className="text-base font-medium">
            {prompt.question} {prompt.required && <span className="text-red-500">*</span>}
          </Label>

          {prompt.type === "text" && (
            <Textarea
              id={prompt.id}
              placeholder={prompt.placeholder}
              className="min-h-[100px] bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              value={(responses[prompt.id] as string) || ""}
              onChange={(e) => handleInputChange(prompt.id, e.target.value)}
              required={prompt.required}
            />
          )}

          {prompt.type === "rating" && (
            <div className="py-2">
              <RadioGroup
                value={(responses[prompt.id] as string) || ""}
                onValueChange={(value) => handleInputChange(prompt.id, value)}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <div key={rating} className="flex flex-col items-center gap-1">
                    <RadioGroupItem value={rating.toString()} id={`${prompt.id}-${rating}`} className="sr-only" />
                    <Label
                      htmlFor={`${prompt.id}-${rating}`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                        (responses[prompt.id] as string) === rating.toString()
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {rating}
                    </Label>
                    {rating === 1 && <span className="text-xs">Low</span>}
                    {rating === 10 && <span className="text-xs">High</span>}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {prompt.type === "multiselect" && prompt.options && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {prompt.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${prompt.id}-${option}`}
                    checked={Array.isArray(responses[prompt.id]) && (responses[prompt.id] as string[]).includes(option)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        const currentValues = (responses[prompt.id] as string[]) || []
                        handleInputChange(prompt.id, [...currentValues, option])
                      } else {
                        const currentValues = (responses[prompt.id] as string[]) || []
                        handleInputChange(
                          prompt.id,
                          currentValues.filter((value) => value !== option),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`${prompt.id}-${option}`} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {prompt.type === "singleselect" && prompt.options && (
            <RadioGroup
              value={(responses[prompt.id] as string) || ""}
              onValueChange={(value) => handleInputChange(prompt.id, value)}
              className="flex flex-col space-y-1 pt-1"
            >
              {prompt.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${prompt.id}-${option}`} />
                  <Label htmlFor={`${prompt.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </motion.div>
      ))}

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          disabled={isLoading || !isValid()}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        >
          {isLoading ? "Analyzing..." : "Submit Journal Entry"}
        </Button>
      </div>
    </form>
  )
}
