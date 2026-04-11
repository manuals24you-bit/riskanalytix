// @ts-nocheck
import { Response } from 'express'
import { prisma } from '../utils/prisma'
import { AuthRequest } from '../middleware/auth'

// ── STATS ──────────────────────────────────────────────────────────
export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const [userCount, analysisCount, recentAnalyses, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.riskAnalysis.count(),
      prisma.riskAnalysis.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
    ])
    res.json({ userCount, analysisCount, recentAnalyses, recentUsers })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

// ── USERS ──────────────────────────────────────────────────────────
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true, role: true,
        emailVerified: true, createdAt: true,
        _count: { select: { riskAnalyses: true } },
      },
    })

    // Pobierz aktywne subskrypcje osobno — bezpieczne nawet gdy tabela ma problemy
    let subsMap: Record<string, any> = {}
    try {
      const subs = await prisma.subscription.findMany({
        where: { status: 'active' },
        orderBy: { createdAt: 'desc' },
      })
      for (const s of subs) {
        if (!subsMap[s.userId]) subsMap[s.userId] = s
      }
    } catch (subErr) {
      console.error('Subscription fetch error (non-fatal):', subErr)
    }

    const normalized = users.map((u: any) => ({
      ...u,
      _count: { analyses: u._count.riskAnalyses },
      subscription: subsMap[u.id] ? [subsMap[u.id]] : [],
    }))
    res.json(normalized)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { role, name } = req.body
    if (id === req.user!.userId && role && role !== 'ADMIN') {
      res.status(400).json({ error: 'Nie możesz zmienić własnej roli administratora' })
      return
    }
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(role && { role }),
        ...(name && { name }),
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })
    res.json(user)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    if (id === req.user!.userId) {
      res.status(400).json({ error: 'Nie możesz usunąć własnego konta' })
      return
    }
    await prisma.user.delete({ where: { id } })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

// ── SETTINGS ───────────────────────────────────────────────────────
export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    const rows = await prisma.appSetting.findMany()
    const settings: Record<string, string> = {}
    rows.forEach(r => { settings[r.key] = r.value })
    res.json(settings)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    const updates: Record<string, string> = req.body
    await Promise.all(
      Object.entries(updates).map(([key, value]) =>
        prisma.appSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      )
    )
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

// ── ALL ANALYSES ────────────────────────────────────────────────────
export const getAllAnalyses = async (req: AuthRequest, res: Response) => {
  try {
    const analyses = await prisma.riskAnalysis.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { riskEntries: true } },
      },
    })
    const normalized = analyses.map((a: any) => ({
      ...a,
      _count: { entries: a._count.riskEntries },
    }))
    res.json(normalized)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

// ── PLAN MANAGEMENT ─────────────────────────────────────────────────

export const grantPlan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { plan, expiresAt } = req.body

    if (!['BASIC', 'PRO'].includes(plan)) {
      res.status(400).json({ error: 'Nieprawidłowy plan. Dozwolone: BASIC, PRO' })
      return
    }

    // Dezaktywuj istniejące aktywne subskrypcje
    await prisma.subscription.updateMany({
      where: { userId: id, status: 'active' },
      data: { status: 'cancelled' },
    })

    // Utwórz nową subskrypcję
    const subscription = await prisma.subscription.create({
      data: {
        userId: id,
        plan,
        status: 'active',
        startsAt: new Date(),
        expiresAt: expiresAt ? new Date(expiresAt) : new Date('2099-12-31T23:59:59Z'),
      },
    })

    res.json(subscription)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}

export const revokePlan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    await prisma.subscription.updateMany({
      where: { userId: id, status: 'active' },
      data: { status: 'cancelled' },
    })

    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Błąd serwera' })
  }
}