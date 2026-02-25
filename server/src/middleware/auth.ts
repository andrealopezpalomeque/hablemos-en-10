import type { Response, NextFunction } from 'express'
import { adminAuth } from '../services/firebase-admin.js'
import type { AuthenticatedRequest } from '../types/index.js'

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No se proporcionó un token de autenticación.' })
    return
  }

  const token = authHeader.split('Bearer ')[1]

  try {
    const decoded = await adminAuth.verifyIdToken(token)
    req.uid = decoded.uid
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado. Por favor, iniciá sesión de nuevo.' })
  }
}
