import express from 'express'
import cors from 'cors'
import { config } from './config/environment.js'
import { topicsRouter } from './routes/topics.js'

const app = express()

app.use(cors({
  origin: config.allowedOrigins,
}))
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/topics', topicsRouter)

app.listen(config.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.port}`)
})
