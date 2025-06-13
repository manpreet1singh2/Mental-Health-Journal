"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface AnalysisErrorProps {
  onRetry: () => void
}

export default function AnalysisError({ onRetry }: AnalysisErrorProps) {
  return (
    <Card className="border-red-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <CardTitle>Analysis Error</CardTitle>
        </div>
        <CardDescription>We encountered an issue while analyzing your journal entry.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          This could be due to a temporary issue with our AI service. You can try the following:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Try submitting your entry again</li>
          <li>Shorten your journal entry if it's very long</li>
          <li>Check your internet connection</li>
        </ul>
        <div className="pt-2">
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
