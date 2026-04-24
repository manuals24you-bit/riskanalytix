import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: { userId: string; role: string }
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Brak tokenu autoryzacji' })
    return
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = verifyAccessToken(token)
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Token nieważny lub wygasł' })
  }
}

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ error: 'Brak uprawnień administratora' })
    return
  }
  next()
}
export const requireSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === 'ADMIN') { next(); return }
  const { prisma } = await import('../utils/prisma')
  const now = new Date()
  const sub = await prisma.subscription.findFirst({
    where: {
      userId: req.user!.userId,
      status: 'active',
      expiresAt: { gt: now },
    },
  })
  if (!sub) {
    res.status(403).json({ error: 'Brak aktywnej subskrypcji' })
    return
  }
  next()
}
