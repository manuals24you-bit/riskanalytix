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

// Bardzo ważne dla Vercel/Cloudflare, aby rate limiter widział poprawne IP użytkownika
app.set('trust proxy', 1)

const PORT = process.env.PORT || 3001
const isDev = process.env.NODE_ENV !== 'production'

// 1. HELMET - Konfiguracja bezpiecznych nagłówków
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
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // 1. Pozwól na brak origin (Postman, urządzenia mobilne)
    if (!origin) return callback(null, true);

    // 2. Sprawdź czy origin jest na liście allowedOrigins
    const isAllowed = allowedOrigins.includes(origin);

    // 3. Sprawdź czy to subdomena vercel.app (dynamiczne podglądy Vercel)
    const isVercelSubdomain = origin.endsWith('.vercel.app');

    if (isAllowed || isVercelSubdomain) {
      callback(null, true);
    } else {
      console.warn(`🛑 CORS Blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['set-cookie'] // Ważne, jeśli używasz ciasteczek sesyjnych
}))

// 3. OBSŁUGA ZAPYTAŃ OPTIONS (Preflight)
app.options('*', cors());

// Middlewares
app.use(express.json({ limit: '10mb' }))

// Webhook musi być przed express.json() jeśli potrzebuje raw body, 
// ale tutaj używamy prostego parsowania dla ułatwienia
app.use('/api/webhooks', webhookRoutes)

// Limity zapytań (zwiększone limity, aby uniknąć blokad podczas testów)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 2000 : 200, 
  message: { error: 'Zbyt wiele requestów, spróbuj za chwilę.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString() 
  })
})

// Trasy API
app.use('/api/auth',     authRoutes)
app.use('/api/analyses', analysisRoutes)
app.use('/api/admin',    adminRoutes)

// Obsługa błędów (zapobiega wywalaniu się serwera)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS Error: Origin not allowed' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Serwer działa na porcie ${PORT}`)
  })
}

export default app