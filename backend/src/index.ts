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

app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [process.env.FRONTEND_URL, 'http://localhost:5173', 'https://riskanalytix.vercel.app', 'https://riskanalytix-production.vercel.app', 'https://riskanalytix.eu', 'https://www.riskanalytix.eu']
    if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
// Webhook musi byc przed express.json() zeby miec dostep do raw body
app.use('/api/webhooks', express.raw({ type: 'application/json' }), (req: any, res, next) => {
  if (req.body && Buffer.isBuffer(req.body)) req.body = JSON.parse(req.body.toString())
  next()
}, webhookRoutes)

app.use(express.json({ limit: '10mb' }))

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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth',     authRoutes)
app.use('/api/analyses', analysisRoutes)
app.use('/api/admin',    adminRoutes)

app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`)
  console.log(`🌍 Środowisko: ${process.env.NODE_ENV}`)
})

export default app