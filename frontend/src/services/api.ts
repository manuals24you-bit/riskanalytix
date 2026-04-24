import axios from 'axios'

/**
 * Adres URL backendu.
 * 1. Najpierw sprawdza zmienną środowiskową VITE_API_URL.
 * 2. Jeśli jej nie ma, a jesteśmy na Vercelu (produkcja), używa relatywnej ścieżki /api.
 * 3. Tylko w trybie deweloperskim używa localhost:3001.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api')

/**
 * Funkcja oczyszczająca dane przed wysyłką do JSON.
 */
const sanitizeForJson = (obj: unknown): unknown => {
  if (typeof obj === 'string') {
    return obj.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  }
  if (Array.isArray(obj)) return obj.map(sanitizeForJson)
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, sanitizeForJson(v)])
    )
  }
  return obj
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

const getAccessToken = (): string | null => {
  try {
    const raw = localStorage.getItem('riskanalytix-auth')
    if (!raw) return null
    return JSON.parse(raw)?.state?.accessToken ?? null
  } catch { return null }
}

const getRefreshToken = (): string | null => {
  try {
    const raw = localStorage.getItem('riskanalytix-auth')
    if (!raw) return null
    return JSON.parse(raw)?.state?.refreshToken ?? null
  } catch { return null }
}

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data && typeof config.data === 'object') {
    config.data = sanitizeForJson(config.data)
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) throw new Error('Brak refresh tokena')

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
        
        const raw = localStorage.getItem('riskanalytix-auth')
        if (raw) {
          const parsed = JSON.parse(raw)
          parsed.state.accessToken = data.accessToken
          parsed.state.refreshToken = data.refreshToken
          localStorage.setItem('riskanalytix-auth', JSON.stringify(parsed))
        }

        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch (refreshError) {
        const raw = localStorage.getItem('riskanalytix-auth')
        if (raw) {
          const parsed = JSON.parse(raw)
          parsed.state.accessToken = null
          parsed.state.refreshToken = null
          parsed.state.user = null
          localStorage.setItem('riskanalytix-auth', JSON.stringify(parsed))
        }
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default api