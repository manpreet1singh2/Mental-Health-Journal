"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800" />

      {/* Animated shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-200 dark:bg-purple-900/20 blur-3xl opacity-30"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900/20 blur-3xl opacity-30"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-teal-200 dark:bg-teal-900/20 blur-3xl opacity-30"
        animate={{
          x: [0, 50, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
    </div>
  )
}
