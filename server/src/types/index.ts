import type { Request } from 'express'

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

export interface GenerateTopicRequest {
  category?: TopicCategory
  completedTopics?: string[]
}

export interface AuthenticatedRequest extends Request {
  uid: string
}
