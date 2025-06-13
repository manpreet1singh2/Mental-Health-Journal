export interface JournalPrompt {
  id: string
  question: string
  type: "text" | "rating" | "multiselect" | "singleselect"
  options?: string[]
  placeholder?: string
  required?: boolean
}

export interface JournalTemplate {
  id: string
  name: string
  description: string
  icon: string
  color: string
  prompts: JournalPrompt[]
}

export interface TemplateResponse {
  [key: string]: string | number | string[]
}
