// @ts-nocheck
// frontend/src/i18n/pdfTranslations.ts
import { translations } from './translations'

export type Lang = 'pl' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'cs'

export function getPdfT(lang?: string): typeof translations.pl.pdf & typeof translations.pl.risk & typeof translations.pl.machines {
  const l = (lang || 'pl') as Lang
  const t = translations[l] || translations.pl
  return { ...t.pdf, ...t.risk, ...t.machines }
}

export function getT(lang?: string) {
  const l = (lang || 'pl') as Lang
  return translations[l] || translations.pl
}
