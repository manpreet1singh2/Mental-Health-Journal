// Environment variables configuration
export const config = {
  groqApiKey: process.env.GROQ_API_KEY,
}

// Validate required environment variables
export function validateConfig() {
  if (!config.groqApiKey) {
    console.warn("Warning: GROQ_API_KEY environment variable is not set")
  }
}
