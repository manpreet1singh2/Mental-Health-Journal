export interface EmotionResponse {
  primary_emotion: string
  secondary_emotions: string[]
  emotional_summary: string
  self_care_tips: string[]
  support_message?: string
}
