export interface Topic {
  topic: string
  keywords: string[]
  questions: string[]
  category: TopicCategory
}

export type TopicCategory =
  | 'educacion'
  | 'economia'
  | 'politica'
  | 'tradiciones'
  | 'arte'
  | 'viajes'
  | 'familia'
  | 'corrientes'
  | 'tecnologia'
  | 'naturaleza'
  | 'personajes'

export interface CompletedTopic extends Topic {
  id: string
  completedAt: Date
  timerCompleted: boolean
}

export interface UserProfile {
  uid: string
  displayName: string
  email: string
  photoURL: string
  createdAt: Date
  lastLogin: Date
}
