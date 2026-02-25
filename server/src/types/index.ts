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
  | 'tradiciones'
  | 'arte'
  | 'viajes'
  | 'familia'
  | 'corrientes'
  | 'tecnologia'
  | 'naturaleza'
  | 'personajes'

export interface GenerateTopicRequest {
  category?: TopicCategory
  completedTopics?: string[]
}

export interface AuthenticatedRequest extends Request {
  uid: string
}
