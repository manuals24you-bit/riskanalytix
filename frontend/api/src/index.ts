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
app.set('trust proxy', 1)

const PORT = process.env.PORT || 3001
const isDev = process.env.NODE_ENV !== 'production'

// 1. HELMET - Konfiguracja pozwalająca na komunikację między różnymi źródłami (cross-origin)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// 2. KONFIGURACJA CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://riskanalytix.vercel.app',
  'https://riskanalytix-production.vercel.app',
  'https://riskanalytix.eu',
  'https://www.riskanalytix.eu'
].filter(Boolean); // Usuwa undefined, jeśli zmienne środowiskowe nie są ustawione

app.use(cors({
  origin: (origin, callback) => {
    // W trybie deweloperskim pozwalamy na brak origin (np. Postman)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      console.warn(`🛑 CORS Blocked: ${origin}`); // Loguje, jaki adres został zablokowany
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// 3. OBSŁUGA ZAPYTAŃ OPTIONS (Preflight)
// Przeglądarki wysyłają OPTIONS przed POST/PUT. Musimy na nie odpowiedzieć nagłówkami CORS.
app.options('*', cors());

// Webhook musi być przed express.json() zeby miec dostep do raw body
app.use('/api/webhooks', express.raw({ type: 'application/json' }), (req: any, res, next) => {
  if (req.body && Buffer.isBuffer(req.body)) req.body = JSON.parse(req.body.toString())
  next()
}, webhookRoutes)

app.use(express.json({ limit: '10mb' }))

// Limity zapytań
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 1000 : 100,
  message: { error: 'Zbyt wiele requestów, spróbuj za chwilę.' },
})
app.use('/api/', limiter)

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 200 : 10,
  message: { error: 'Zbyt wiele prób logowania, spróbuj za 15 minut.' },
})
app.use('/api/auth/', authLimiter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Trasy API
app.use('/api/auth',     authRoutes)
app.use('/api/analyses', analysisRoutes)
app.use('/api/admin',    adminRoutes)

app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`)
  console.log(`🌍 Środowisko: ${process.env.NODE_ENV}`)
})

export default app