// backend/src/routes/webhook.routes.ts
import { Router } from 'express'
import { handleLemonSqueezyWebhook } from '../controllers/webhook.controller'

const router = Router()

// Lemon Squeezy wysyła JSON — nie wymaga auth
router.post('/lemonsqueezy', handleLemonSqueezyWebhook)

export default router