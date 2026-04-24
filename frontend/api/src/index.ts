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

// 1. HELMET
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// 2. CORS - Rozszerzona lista i obsługa subdomen
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://riskanalytix.vercel.app',
  'https://riskanalytix.eu',
  'https://www.riskanalytix.eu'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
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

app.options('*', cors());

// Middlewares
app.use(express.json({ limit: '10mb' }))

// Trasy
app.use('/api/auth', authRoutes)
app.use('/api/analyses', analysisRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/webhooks', webhookRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV })
})

// WAŻNE: Na Vercelu nie używamy app.listen w ten sposób
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => console.log(`✅ Dev server: http://localhost:${PORT}`))
}

export default app