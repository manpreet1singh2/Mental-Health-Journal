"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, CalendarIcon, BookOpen, Sparkles, LayoutTemplate } from "lucide-react"
import { analyzeJournalEntry } from "@/lib/analyze-entry"
import type { EmotionResponse } from "@/types/emotions"
import type { JournalTemplate, TemplateResponse } from "@/types/templates"
import EmotionDisplay from "@/components/emotion-display"
import EmojiMoodSelector from "@/components/emoji-mood-selector"
import WeeklyMoodChart from "@/components/weekly-mood-chart"
import MoodInsights from "@/components/mood-insights"
import ThemeToggle from "@/components/theme-toggle"
import AnimatedBackground from "@/components/background"
import ConfettiCelebration from "@/components/confetti-celebration"
import TemplateSelector from "@/components/template-selector"
import TemplateJournalForm from "@/components/template-journal-form"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function JournalPage() {
  const [journalEntry, setJournalEntry] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [analysis, setAnalysis] = useState<EmotionResponse | null>(null)
  const [streak, setStreak] = useState(0)
  const [lastEntry, setLastEntry] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<JournalTemplate | null>(null)
  const { toast } = useToast()

  // Load streak data from localStorage on component mount
  useEffect(() => {
    const savedStreak = localStorage.getItem("journal-streak")
    const savedLastEntry = localStorage.getItem("journal-last-entry")

    if (savedStreak) setStreak(Number.parseInt(savedStreak))
    if (savedLastEntry) setLastEntry(new Date(savedLastEntry))
  }, [])

  // Speech recognition setup
  const toggleRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support voice input. Try using Chrome.",
        variant: "destructive",
      })
      return
    }

    if (isRecording) {
      setIsRecording(false)
      // Stop recording logic would go here
      return
    }

    setIsRecording(true)
    // This is a simplified version - in a real app, you'd implement the full SpeechRecognition API
    const SpeechRecognition = window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")

      setJournalEntry((prev) => prev + " " + transcript)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  async function handleSubmit() {
    if (!journalEntry.trim()) {
      toast({
        title: "Empty Journal Entry",
        description: "Please write something about how you're feeling today.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Show a loading toast
      toast({
        title: "Analyzing your entry",
        description: "Our AI is processing your journal entry...",
      })

      const result = await analyzeJournalEntry(journalEntry)
      setAnalysis(result)

      updateStreak()

      // Success toast
      toast({
        title: "Analysis Complete",
        description: "Your journal entry has been analyzed successfully.",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to analyze your journal entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleTemplateSubmit(responses: TemplateResponse) {
    if (!selectedTemplate) return

    setIsLoading(true)

    try {
      // Show a loading toast
      toast({
        title: "Analyzing your entry",
        description: "Our AI is processing your journal entry...",
      })

      // Convert template responses to a string representation for analysis
      const result = await analyzeJournalEntry("", selectedTemplate.name, responses)
      setAnalysis(result)

      updateStreak()

      // Success toast
      toast({
        title: "Analysis Complete",
        description: "Your journal entry has been analyzed successfully.",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to analyze your journal entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateStreak = () => {
    // Update streak
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (!lastEntry) {
      // First entry
      setStreak(1)
    } else {
      const lastEntryDate = new Date(lastEntry)
      lastEntryDate.setHours(0, 0, 0, 0)

      if (lastEntryDate.getTime() === yesterday.getTime()) {
        // Consecutive day
        setStreak((prev) => prev + 1)
      } else if (lastEntryDate.getTime() < yesterday.getTime()) {
        // Streak broken
        setStreak(1)
      }
      // If same day, streak remains unchanged
    }

    // Save streak data
    setLastEntry(today)
    localStorage.setItem("journal-streak", streak.toString())
    localStorage.setItem("journal-last-entry", today.toISOString())
  }

  const handleEmojiMood = async (mood: string) => {
    // Generate a more detailed entry based on the selected mood
    const moodEntries = {
      Happy: `I'm feeling happy today. There's a sense of lightness and positivity in my mood. Things seem to be going well, and I'm enjoying the moment.`,
      Sad: `I'm feeling sad today. There's a heaviness in my heart, and I'm experiencing some difficult emotions. I'm trying to process these feelings.`,
      Anxious: `I'm feeling anxious today. My mind is racing with worries and concerns. I notice tension in my body, especially in my shoulders and chest.`,
      Angry: `I'm feeling angry today. There's frustration and irritation building up inside me. I'm trying to understand what triggered these feelings.`,
      Stressed: `I'm feeling stressed today. There's a lot of pressure and I feel overwhelmed by responsibilities and expectations.`,
      Excited: `I'm feeling excited today! There's a buzz of anticipation and energy running through me. I'm looking forward to what's coming.`,
      Depressed: `I'm feeling depressed today. It's hard to find motivation or joy in things. Everything feels more difficult than usual.`,
      Confused: `I'm feeling confused today. My thoughts are jumbled and I'm having trouble making decisions or seeing things clearly.`,
      Hopeful: `I'm feeling hopeful today. Despite challenges, I sense possibilities ahead and believe things can get better.`,
      Lonely: `I'm feeling lonely today. I'm experiencing a sense of disconnection and wishing for more meaningful connection with others.`,
    }

    // Set the journal entry text based on the selected mood
    const entryText = moodEntries[mood as keyof typeof moodEntries] || `I'm feeling ${mood.toLowerCase()} today.`
    setJournalEntry(entryText)

    // Now process the entry
    setIsLoading(true)

    try {
      // Show a loading toast
      toast({
        title: "Analyzing your mood",
        description: "Our AI is processing your mood selection...",
      })

      const result = await analyzeJournalEntry(entryText)
      setAnalysis(result)

      updateStreak()

      // Success toast
      toast({
        title: "Analysis Complete",
        description: "Your mood has been analyzed successfully.",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to analyze your mood. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Journal prompts
  const journalPrompts = [
    "How are you feeling today?",
    "What made you smile today?",
    "What's something challenging you faced today?",
    "What are you grateful for right now?",
    "How did you take care of yourself today?",
    "What's something you're looking forward to?",
    "Describe your current mood in detail.",
    "What's something that's been on your mind lately?",
  ]

  const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)]

  return (
    <>
      <AnimatedBackground />
      <ConfettiCelebration streak={streak} />

      <div className="container mx-auto py-8 max-w-4xl relative z-10">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Mental Health Journal
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Track your emotions and take care of your mental wellbeing
          </p>
        </motion.div>

        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge variant="outline" className="text-sm py-1 px-3">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Streak:</span>
            <Badge variant="secondary" className="font-bold">
              <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
              {streak} {streak === 1 ? "day" : "days"}
            </Badge>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Tabs defaultValue="journal" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="journal">
                <BookOpen className="w-4 h-4 mr-2" />
                Free Writing
              </TabsTrigger>
              <TabsTrigger value="templates">
                <LayoutTemplate className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="mood">
                <span className="mr-2">😊</span>
                Quick Mood
              </TabsTrigger>
            </TabsList>

            <TabsContent value="journal">
              <Card className="glass-card border border-gray-100 dark:border-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle>How are you feeling today?</CardTitle>
                  <CardDescription>Write about your day, emotions, thoughts, or anything on your mind.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Textarea
                      placeholder={randomPrompt}
                      className="min-h-[200px] resize-none bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                    />
                    <Button
                      size="icon"
                      variant={isRecording ? "destructive" : "outline"}
                      className="absolute bottom-3 right-3"
                      onClick={toggleRecording}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    {isLoading ? "Analyzing..." : "Analyze My Feelings"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card className="glass-card border border-gray-100 dark:border-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle>Journal Templates</CardTitle>
                  <CardDescription>Choose a structured template to guide your journaling experience.</CardDescription>
                </CardHeader>
                <CardContent>
                  {!selectedTemplate ? (
                    <TemplateSelector onSelect={setSelectedTemplate} />
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">{selectedTemplate.name}</h3>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)}>
                          Change Template
                        </Button>
                      </div>
                      <TemplateJournalForm
                        template={selectedTemplate}
                        onSubmit={handleTemplateSubmit}
                        isLoading={isLoading}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mood">
              <Card className="glass-card border border-gray-100 dark:border-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Mood Check-in</CardTitle>
                  <CardDescription>Select an emoji that best represents how you're feeling right now.</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmojiMoodSelector onSelect={handleEmojiMood} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {isLoading ? (
          <motion.div
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full border-4 border-t-purple-500 border-b-blue-500 border-l-transparent border-r-transparent animate-spin"></div>
              <p className="text-sm text-muted-foreground">Analyzing your journal entry...</p>
            </div>
          </motion.div>
        ) : analysis ? (
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <EmotionDisplay analysis={analysis} />
            <MoodInsights analysis={analysis} streak={streak} />

            <Card className="glass-card border border-gray-100 dark:border-gray-800 shadow-lg md:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Mood Tracker</CardTitle>
                <CardDescription>See how your emotions have changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyMoodChart />
              </CardContent>
            </Card>
          </motion.div>
        ) : null}

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mental Health Journal. All rights reserved.</p>
          <p className="mt-1">Your data is stored locally on your device.</p>
        </footer>
      </div>
    </>
  )
}
