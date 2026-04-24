import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import analysisRoutes from './routes/analysis.routes'
import adminRoutes from './routes/admin.routes'
import webhookRoutes from './routes/webhook.routes'

dotenv.config()

const app = express()

// Vercel działa za proxy, musimy ufać nagłówkom IP, aby rate limiter działał poprawnie
app.set('trust proxy', 1)

// 1. HELMET - Zabezpieczenie nagłówków z poluzowaniem polityki cross-origin dla API
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// 2. DYNAMICZNA KONFIGURACJA CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://riskanalytix.vercel.app',
  'https://riskanalytix.eu',
  'https://www.riskanalytix.eu'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Pozwalamy na: brak origin (np. Postman), adresy z listy lub dowolną subdomenę Vercel
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      console.warn(`🛑 CORS Blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}))

// Obsługa zapytań wstępnych (preflight)
app.options('*', cors());

// Middlewares
app.use(express.json({ limit: '10mb' }))

// Definicja tras API
app.use('/api/auth', authRoutes)
app.use('/api/analyses', analysisRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/webhooks', webhookRoutes)

// Health check do weryfikacji statusu wdrożenia
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
})

/**
 * Kluczowa zmiana dla Vercel:
 * Na platformie Vercel nie wywołujemy app.listen().
 * Serwer jest eksportowany jako moduł, a Vercel sam nim zarządza.
 */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => console.log(`✅ Dev server: http://localhost:${PORT}`))
}

export default app