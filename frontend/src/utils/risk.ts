import type { RiskLevel } from '../types'

export const getRiskLevel = (s: number, p: number): RiskLevel => {
  const r = s * p
  if (r >= 12) return { label: 'WYSOKIE',   level: 4, cls: 'high', r, color: '#E84040' }
  if (r >= 6)  return { label: 'ŚREDNIE',   level: 3, cls: 'med',  r, color: '#F59E0B' }
  if (r >= 3)  return { label: 'NISKIE',    level: 2, cls: 'low',  r, color: '#34C77B' }
  return        { label: 'POMIJALNE', level: 1, cls: 'neg',  r, color: '#8a99b0' }
}

export const severityLabels: Record<number, string> = {
  1: 'Nieznaczna',
  2: 'Mała',
  3: 'Poważna',
  4: 'Katastrofalna',
}

export const probabilityLabels: Record<number, string> = {
  1: 'Rzadkie',
  2: 'Możliwe',
  3: 'Prawdopodobne',
  4: 'Prawie pewne',
}