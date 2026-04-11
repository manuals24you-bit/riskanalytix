// @ts-nocheck
// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '../utils/prisma'
import { generateTokens, verifyRefreshToken } from '../utils/jwt'


// Normalizuje subscription[]: bierze pierwszy aktywny wpis lub null
function normalizeUser(user: any) {
  if (!user) return user
  const subs: any[] = user.subscription || []
  const active = subs.find((s: any) => s.status === 'active') || null
  return { ...user, subscription: active }
}

const registerSchema = z.object({
  name:        z.string().min(2),
  email:       z.string().email(),
  password:    z.string().min(8),
  companyName: z.string().min(2),
  nip:         z.string().regex(/^\d{10}$/),
  regon:       z.string().regex(/^\d{9}(\d{5})?$/).optional().or(z.literal('')),
  street:      z.string().min(3),
  city:        z.string().min(2),
  postalCode:  z.string().regex(/^\d{2}-\d{3}$/),
  country:     z.string().default('Polska'),
  phone:       z.string().optional().or(z.literal('')),
})

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
})

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body)

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return res.status(409).json({ message: 'Konto z tym adresem email już istnieje' })
    }

    const nipExists = await prisma.user.findFirst({ where: { nip: data.nip } })
    if (nipExists) {
      return res.status(409).json({ message: 'Firma z tym NIP jest już zarejestrowana' })
    }

    const passwordHash = await bcrypt.hash(data.password, 12)

    const user = await prisma.user.create({
      data: {
        name:         data.name,
        email:        data.email,
        passwordHash,
        companyName:  data.companyName,
        nip:          data.nip,
        regon:        data.regon || null,
        street:       data.street,
        city:         data.city,
        postalCode:   data.postalCode,
        country:      data.country,
        phone:        data.phone || null,
      },
      select: {
        id: true, email: true, name: true, role: true,
        companyName: true, nip: true, regon: true,
        street: true, city: true, postalCode: true, country: true, phone: true,
        logoUrl: true,
        subscription: {
          where: { status: 'active', expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { plan: true, status: true, expiresAt: true },
        },
      },
    })

    const tokens = generateTokens(user.id, user.role)
    res.status(201).json({ user: normalizeUser(user), ...tokens })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Błąd walidacji',
        errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
      })
    }
    console.error('Register error:', err)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true, email: true, name: true, role: true,
        passwordHash: true,
        companyName: true, nip: true, regon: true,
        street: true, city: true, postalCode: true, country: true, phone: true,
        logoUrl: true,
        subscription: {
          where: { status: 'active', expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { plan: true, status: true, expiresAt: true },
        },
      },
    })

    if (!user) {
      return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' })
    }

    const { passwordHash: _, ...userWithoutPassword } = user
    const tokens = generateTokens(user.id, user.role)
    res.json({ user: normalizeUser(userWithoutPassword), ...tokens })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: 'Nieprawidłowe dane logowania' })
    }
    console.error('Login error:', err)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ message: 'Brak refresh tokena' })

    const payload = verifyRefreshToken(refreshToken)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, role: true },
    })
    if (!user) return res.status(401).json({ message: 'Użytkownik nie istnieje' })

    const tokens = generateTokens(user.id, user.role)
    res.json(tokens)
  } catch {
    res.status(401).json({ message: 'Nieprawidłowy refresh token' })
  }
}

export const me = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.userId },
      select: {
        id: true, email: true, name: true, role: true,
        companyName: true, nip: true, regon: true,
        street: true, city: true, postalCode: true, country: true, phone: true,
        logoUrl: true,
        subscription: {
          where: { status: 'active', expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { plan: true, status: true, expiresAt: true },
        },
      },
    })
    if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' })
    res.json(normalizeUser(user))
  } catch {
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

const updateProfileSchema = z.object({
  name:        z.string().min(2).optional(),
  companyName: z.string().min(2).optional(),
  nip:         z.string().regex(/^\d{10}$/).optional(),
  regon:       z.string().optional().or(z.literal('')),
  street:      z.string().min(3).optional(),
  city:        z.string().min(2).optional(),
  postalCode:  z.string().regex(/^\d{2}-\d{3}$/).optional(),
  country:     z.string().optional(),
  phone:       z.string().optional(),
  logoUrl:     z.string().url().optional().or(z.literal('')),
})

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const data = updateProfileSchema.parse(req.body)
    const userId = (req as any).user.userId

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        regon:   data.regon   || null,
        phone:   data.phone   || null,
        logoUrl: data.logoUrl || null,
      },
      select: {
        id: true, email: true, name: true, role: true,
        companyName: true, nip: true, regon: true,
        street: true, city: true, postalCode: true, country: true, phone: true,
        logoUrl: true,
        subscription: {
          where: { status: 'active', expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { plan: true, status: true, expiresAt: true },
        },
      },
    })
    res.json(normalizeUser(user))
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Błąd walidacji',
        errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
      })
    }
    res.status(500).json({ message: 'Błąd serwera' })
  }
}