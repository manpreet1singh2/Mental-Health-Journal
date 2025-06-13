"use server"

import { groq } from "@ai-sdk/groq"
import { config, validateConfig } from "./config"

// Validate environment variables
validateConfig()

// Initialize the Groq client - now as an async function
export async function getGroqClient() {
  if (!config.groqApiKey) {
    throw new Error("GROQ_API_KEY environment variable is not set")
  }

  return groq
}
