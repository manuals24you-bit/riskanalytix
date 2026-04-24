import axios from 'axios'

/**
 * Adres URL backendu.
 * Dynamicznie sprawdza, czy aplikacja działa na localhost, czy na produkcji.
 */
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

// Na produkcji ZAWSZE używamy relatywnej ścieżki /api (obsługiwanej przez vercel.json)
// Na localhost uderzamy bezpośrednio w port 3001
const BASE_URL = isLocalhost 
  ? 'http://localhost:3001/api' 
  : '/api';

console.log('🚀 API Configuration:', {
  hostname: window.location.hostname,
  isLocalhost,
  baseURL: BASE_URL
});

/**
 * Funkcja oczyszczająca dane przed wysyłką do JSON.
 * Zapobiega błędom parsowania przy znakach specjalnych.
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
  withCredentials: true
})

// Interceptor żądań
api.interceptors.request.use((config) => {
  // Pobieranie tokena z localStorage (zakładając, że tak go przechowujesz)
  const authStorage = localStorage.getItem('riskanalytix-auth');
  if (authStorage) {
    try {
      const { state } = JSON.parse(authStorage);
      if (state?.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
    } catch (e) {
      console.error('Błąd odczytu tokena:', e);
    }
  }

  if (config.data && typeof config.data === 'object') {
    config.data = sanitizeForJson(config.data)
  }
  return config
})

// Interceptor odpowiedzi (obsługa wygasłego tokena)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const authStorage = localStorage.getItem('riskanalytix-auth');
        if (!authStorage) throw new Error('Brak danych logowania');
        
        const parsed = JSON.parse(authStorage);
        const refreshToken = parsed.state?.refreshToken;
        
        if (!refreshToken) throw new Error('Brak refresh tokena');

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
        
        // Aktualizacja tokenów w storage
        parsed.state.accessToken = data.accessToken
        parsed.state.refreshToken = data.refreshToken
        localStorage.setItem('riskanalytix-auth', JSON.stringify(parsed))

        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch (refreshError) {
        // Jeśli odświeżanie zawiedzie, wyloguj użytkownika
        localStorage.removeItem('riskanalytix-auth');
        window.location.href = '/login';
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default api