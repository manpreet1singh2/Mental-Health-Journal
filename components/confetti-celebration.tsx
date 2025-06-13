"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

interface ConfettiCelebrationProps {
  streak: number
}

export default function ConfettiCelebration({ streak }: ConfettiCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    // Show confetti for milestone streaks
    if (streak === 7 || streak === 30 || streak === 100) {
      setShowConfetti(true)

      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [streak])

  if (!showConfetti) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.15}
      colors={["#c084fc", "#818cf8", "#38bdf8", "#34d399", "#fcd34d"]}
    />
  )
}
