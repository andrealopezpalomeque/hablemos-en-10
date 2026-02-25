import { Router } from 'express'

export const topicsRouter = Router()

// Placeholder — will be implemented in Phase 4
topicsRouter.post('/generate', (_req, res) => {
  res.json({
    topic: 'Los Carnavales de Corrientes',
    keywords: ['comparsa', 'corso', 'disfraz', 'murga', 'tablado', 'alegría'],
    questions: [
      '¿Qué sentías cuando escuchabas la música del carnaval?',
      '¿Cómo cambió el carnaval desde que eras joven hasta hoy?',
      '¿Qué opinás sobre cómo se vive el carnaval ahora?',
    ],
    category: 'cultura',
  })
})
