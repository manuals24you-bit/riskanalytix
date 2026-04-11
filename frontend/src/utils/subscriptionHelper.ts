// frontend/src/utils/subscriptionHelper.ts
// Obsługuje oba formaty subscription: tablica (z Prismy) lub obiekt (znormalizowany)

import type { User } from '../store/auth.store'

export interface SubInfo {
  plan: string    // 'BASIC' | 'PRO' | 'FREE'
  status: string
  isActive: boolean
}

export function getSubInfo(user: User | null): SubInfo {
  if (!user) return { plan: 'FREE', status: 'none', isActive: false }

  const sub = user.subscription

  // Format 1: tablica (bezpośrednio z Prismy)
  if (Array.isArray(sub)) {
    const active = (sub as any[]).find(s => s.status === 'active')
    if (!active) return { plan: 'FREE', status: 'none', isActive: false }
    return { plan: (active.plan || '').toUpperCase(), status: active.status, isActive: true }
  }

  // Format 2: obiekt (znormalizowany przez backend)
  if (sub && typeof sub === 'object' && 'plan' in sub) {
    return {
      plan: ((sub as any).plan || '').toUpperCase(),
      status: (sub as any).status || 'active',
      isActive: true,
    }
  }

  return { plan: 'FREE', status: 'none', isActive: false }
}

export function isPro(user: User | null): boolean {
  if (user?.role === 'ADMIN') return true
  return getSubInfo(user).plan === 'PRO'
}

export function hasAnyPlan(user: User | null): boolean {
  if (user?.role === 'ADMIN') return true
  return getSubInfo(user).isActive
}

export function getPlanLabel(user: User | null): string {
  if (user?.role === 'ADMIN') return 'Admin'
  const plan = getSubInfo(user).plan
  if (plan === 'FREE') return 'Free'
  if (plan === 'BASIC') return 'Basic'
  if (plan === 'PRO') return 'Pro'
  return plan
}

export function getPlanColor(user: User | null): string {
  if (user?.role === 'ADMIN') return '#3B82F6'
  const plan = getSubInfo(user).plan
  if (plan === 'PRO') return '#A78BFA'
  if (plan === 'BASIC') return '#E8A838'
  return '#6B7280'
}