"use server"

import type { EmotionResponse } from "@/types/emotions"
import { generateText } from "ai"
import type { TemplateResponse } from "@/types/templates"

// Helper function to attempt to fix common JSON formatting issues
function sanitizeJsonString(jsonString: string): string {
  // Remove any markdown code block markers
  let cleaned = jsonString.replace(/```json|```/g, "").trim()

  // Try to find where the JSON object actually starts and ends
  const startIdx = cleaned.indexOf("{")
  const endIdx = cleaned.lastIndexOf("}")

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1)
  }

  return cleaned
}

// Format template responses into a readable text
function formatTemplateResponses(templateName: string, responses: TemplateResponse): string {
  let formattedText = `Template: ${templateName}\n\n`

  Object.entries(responses).forEach(([key, value]) => {
    // Format the key to be more readable
    const readableKey = key
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Format the value based on its type
    let formattedValue: string
    if (Array.isArray(value)) {
      formattedValue = value.join(", ")
    } else {
      formattedValue = String(value)
    }

    formattedText += `${readableKey}: ${formattedValue}\n`
  })

  return formattedText
}

export async function analyzeJournalEntry(
  text: string,
  templateName?: string,
  templateResponses?: TemplateResponse,
): Promise<EmotionResponse> {
  try {
    // Import groq directly
    const { groq } = await import("@ai-sdk/groq")

    // Format the input based on whether it's free-form text or template responses
    let inputText = text
    if (templateName && templateResponses) {
      inputText = formatTemplateResponses(templateName, templateResponses)
    }

    // Using the AI SDK with Groq for better performance
    const prompt = `
    Analyze the following journal entry and respond with a JSON object that contains:
    - primary_emotion: The dominant emotional state of the user
    - secondary_emotions: Up to 3 secondary emotions if applicable (array)
    - emotional_summary: A brief summary of the emotional tone (2-3 sentences)
    - self_care_tips: 3 personalized self-care tips or activities based on the emotional state (array)
    - support_message: If the emotion is strongly negative, include a gentle suggestion for professional help (optional)

    Journal Entry: "${inputText}"

    IMPORTANT: Your response MUST be a valid JSON object and nothing else. Do not include any explanations, markdown formatting, or text outside the JSON object.
    `

    const { text: responseText } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: prompt,
      system:
        "You are a mental health AI assistant that helps users understand their emotional state based on journal entries. Be empathetic, warm, and encouraging, not robotic or clinical. You MUST respond with ONLY valid JSON.",
      temperature: 0.2, // Lower temperature for more consistent JSON formatting
    })

    console.log("Raw API response:", responseText)

    // Sanitize and parse the JSON response
    try {
      const sanitizedJson = sanitizeJsonString(responseText)
      console.log("Sanitized JSON:", sanitizedJson)

      const jsonResponse = JSON.parse(sanitizedJson)

      // Validate the response structure
      if (!jsonResponse.primary_emotion) {
        throw new Error("Missing primary_emotion in response")
      }

      // Ensure secondary_emotions is an array
      if (!Array.isArray(jsonResponse.secondary_emotions)) {
        jsonResponse.secondary_emotions = []
      }

      // Ensure self_care_tips is an array
      if (!Array.isArray(jsonResponse.self_care_tips)) {
        jsonResponse.self_care_tips = [
          "Take a moment to breathe deeply and center yourself.",
          "Consider what would bring you comfort right now.",
          "Be gentle with yourself as you process your emotions.",
        ]
      }

      return jsonResponse as EmotionResponse
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError)
      console.error("Problematic JSON string:", responseText)
      throw new Error(`Failed to parse the AI response: ${parseError.message}`)
    }
  } catch (error) {
    console.error("Error in emotion analysis:", error)

    // Fallback to a basic response if the API call fails
    return {
      primary_emotion: "neutral",
      secondary_emotions: ["reflective"],
      emotional_summary: "I couldn't properly analyze your entry, but I appreciate you sharing your thoughts.",
      self_care_tips: [
        "Take a moment to breathe deeply and center yourself.",
        "Consider what would bring you comfort right now.",
        "Be gentle with yourself as you process your emotions.",
      ],
      support_message: "If you're experiencing difficult emotions, remember that it's okay to seek support.",
    }
  }
}
