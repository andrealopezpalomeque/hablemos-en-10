import { Router } from 'express'
import type { Request, Response } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { generateTopic } from '../services/anthropic.js'
import type { AuthenticatedRequest, GenerateTopicRequest } from '../types/index.js'

export const topicsRouter = Router()

topicsRouter.post(
  '/generate',
  requireAuth as unknown as (req: Request, res: Response, next: () => void) => void,
  async (req: Request, res: Response) => {
    try {
      const { uid } = req as AuthenticatedRequest
      const { category, completedTopics } = req.body as GenerateTopicRequest

      console.log(`Generando tema para usuario ${uid}`)
      const topic = await generateTopic(category, completedTopics)

      res.json(topic)
    } catch (error) {
      console.error('Error generando tema:', error)
      res.status(500).json({
        error: 'Hubo un problema al generar el tema. Por favor, intentá de nuevo.',
      })
    }
  },
)
