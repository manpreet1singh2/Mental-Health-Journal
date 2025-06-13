"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface MoodData {
  day: string
  value: number
  emotion: string
}

export default function WeeklyMoodChart() {
  const [data, setData] = useState<MoodData[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    // For demo purposes, we'll generate random data
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const emotions = ["Happy", "Content", "Neutral", "Sad", "Anxious"]

    const today = new Date()
    const dayOfWeek = today.getDay()

    const moodData: MoodData[] = []

    for (let i = 6; i >= 0; i--) {
      const dayIndex = (dayOfWeek - i + 7) % 7

      // Only include data up to today
      if (i <= dayOfWeek) {
        const value = Math.floor(Math.random() * 5) + 1
        moodData.push({
          day: days[dayIndex],
          value: value,
          emotion: emotions[5 - value],
        })
      }
    }

    setData(moodData)
  }, [])

  const emotionToColor = (emotion: string) => {
    const colors: Record<string, string> = {
      Happy: "#4ade80",
      Content: "#a3e635",
      Neutral: "#fcd34d",
      Sad: "#93c5fd",
      Anxious: "#fb923c",
    }
    return colors[emotion] || "#94a3b8"
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${data.day}: ${data.emotion}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          mood: {
            label: "Mood",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value) => {
                const emotions = ["Anxious", "Sad", "Neutral", "Content", "Happy"]
                return emotions[value - 1] || ""
              }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{
                r: 6,
                fill: ({ emotion }: any) => emotionToColor(emotion),
                stroke: "white",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                stroke: "hsl(var(--primary))",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
