// frontend/src/hooks/useGeoLanguage.ts
import { useEffect } from 'react'
import i18n from '../i18n'

const COUNTRY_TO_LANG: Record<string, string> = {
  PL: 'pl',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de',
  FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr',
  IT: 'it', SM: 'it', VA: 'it',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  CZ: 'cs', SK: 'cs',
  GB: 'en', US: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en',
}

export function useGeoLanguage() {
  useEffect(() => {
    // Only detect on first visit (no language saved yet)
    const saved = localStorage.getItem('i18nextLng')
    if (saved) return

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const country = data?.country_code
        const lang = COUNTRY_TO_LANG[country] || 'en'
        i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang)
      })
      .catch(() => {
        // fallback to browser language
        const browserLang = navigator.language?.slice(0, 2)
        const supported = ['pl', 'en', 'de', 'fr', 'it', 'es', 'cs']
        const lang = supported.includes(browserLang) ? browserLang : 'en'
        i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang)
      })
  }, [])
}