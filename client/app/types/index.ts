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
  | 'cultura'
  | 'viajes'
  | 'mundo'
  | 'vida'

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
